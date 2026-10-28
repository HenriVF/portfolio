import { Link } from 'react-router-dom';
import Button from '../components/Button';
import StateMessage from '../components/StateMessage';

export default function NotFound() {
  return (
    <StateMessage
      title="Página não encontrada"
      message="O endereço não existe ou foi movido. Volte para o início e siga a navegação."
      action={
        <Button as={Link} to="/">
          Ir para o início
        </Button>
      }
    />
  );
}
