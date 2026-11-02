import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../context/AuthProvider';

// A autenticação só carrega nas rotas /login e /dashboard.
export default function AuthLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
