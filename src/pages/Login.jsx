import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Field from '../components/Field';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const { user, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';
  const [authError, setAuthError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  if (!loading && user) return <Navigate to={from} replace />;

  const onSubmit = async ({ email, password }) => {
    setAuthError('');
    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      setAuthError(error.message);
    }
  };

  return (
    <section className="section section--narrow">
      <h1>Entrar</h1>
      <p className="muted">Acesso restrito ao dono do site.</p>
      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Field id="email" label="E-mail" error={errors.email && 'Informe o e-mail.'}>
          <input
            id="email"
            type="email"
            autoComplete="username"
            {...register('email', { required: true })}
          />
        </Field>
        <Field id="password" label="Senha" error={errors.password && 'Informe a senha.'}>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register('password', { required: true })}
          />
        </Field>
        <Button type="submit" loading={isSubmitting}>
          {isSubmitting ? 'Entrando…' : 'Entrar'}
        </Button>
        {authError && (
          <p className="feedback feedback--error" role="alert">
            {authError}
          </p>
        )}
      </form>
    </section>
  );
}
