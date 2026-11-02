import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { AuthContext } from '../context/authContext';

function renderAt(authValue) {
  return render(
    <AuthContext.Provider value={authValue}>
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/login" element={<p>Tela de login</p>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<p>Conteúdo secreto</p>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>,
  );
}

describe('ProtectedRoute', () => {
  it('redireciona para o login quando não há usuário autenticado', () => {
    renderAt({ user: null, loading: false });
    expect(screen.getByText('Tela de login')).toBeInTheDocument();
    expect(screen.queryByText('Conteúdo secreto')).not.toBeInTheDocument();
  });

  it('mostra o conteúdo quando o usuário está autenticado', () => {
    renderAt({ user: { email: 'dono@exemplo.com' }, loading: false });
    expect(screen.getByText('Conteúdo secreto')).toBeInTheDocument();
  });

  it('não mostra o conteúdo enquanto verifica o acesso', () => {
    renderAt({ user: null, loading: true });
    expect(screen.queryByText('Conteúdo secreto')).not.toBeInTheDocument();
    expect(screen.queryByText('Tela de login')).not.toBeInTheDocument();
  });
});
