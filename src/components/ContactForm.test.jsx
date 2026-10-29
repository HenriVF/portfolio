import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';
import { sendContact } from '../services/contactService';

vi.mock('../services/contactService', () => ({ sendContact: vi.fn() }));

async function fillValid(user) {
  await user.type(screen.getByLabelText('Nome'), 'Maria Silva');
  await user.type(screen.getByLabelText('E-mail'), 'maria@exemplo.com');
  await user.type(
    screen.getByLabelText('Mensagem'),
    'Gostei muito do seu portfólio, vamos conversar?',
  );
}

describe('ContactForm', () => {
  beforeEach(() => vi.clearAllMocks());

  it('mostra uma mensagem de erro por campo ao enviar vazio', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));

    expect(
      await screen.findByText('O nome precisa ter pelo menos 2 caracteres.'),
    ).toBeInTheDocument();
    expect(screen.getByText('E-mail inválido.')).toBeInTheDocument();
    expect(
      screen.getByText('A mensagem precisa ter no mínimo 20 caracteres.'),
    ).toBeInTheDocument();
    expect(sendContact).not.toHaveBeenCalled();
  });

  it('bloqueia o botão durante o envio', async () => {
    sendContact.mockImplementation(() => new Promise(() => {}));
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValid(user);
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));

    expect(await screen.findByRole('button', { name: /enviando/i })).toBeDisabled();
    expect(sendContact).toHaveBeenCalledTimes(1);
  });

  it('mostra feedback de sucesso', async () => {
    sendContact.mockResolvedValue();
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValid(user);
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));

    expect(await screen.findByText(/mensagem enviada/i)).toBeInTheDocument();
  });

  it('mostra feedback de erro quando o envio falha', async () => {
    sendContact.mockRejectedValue(new Error('Falha ao enviar.'));
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValid(user);
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));

    expect(await screen.findByText('Falha ao enviar.')).toBeInTheDocument();
  });
});
