import { describe, expect, it } from 'vitest';
import { contactSchema } from './contactSchema';

const valid = {
  name: 'Maria Silva',
  email: 'maria@exemplo.com',
  message: 'Gostei muito do seu portfólio e quero conversar.',
};

function messagesFor(data) {
  const result = contactSchema.safeParse(data);
  if (result.success) return {};
  return Object.fromEntries(
    result.error.issues.map((issue) => [issue.path[0], issue.message]),
  );
}

describe('contactSchema', () => {
  it('aceita dados válidos', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it('rejeita e-mail inválido com mensagem específica', () => {
    expect(messagesFor({ ...valid, email: 'maria@' }).email).toBe('E-mail inválido.');
  });

  it('exige mensagem com no mínimo 20 caracteres', () => {
    expect(messagesFor({ ...valid, message: 'curta' }).message).toBe(
      'A mensagem precisa ter no mínimo 20 caracteres.',
    );
  });

  it('exige nome com pelo menos 2 caracteres', () => {
    expect(messagesFor({ ...valid, name: 'A' }).name).toBe(
      'O nome precisa ter pelo menos 2 caracteres.',
    );
  });
});
