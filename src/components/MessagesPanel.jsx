import { useMessages, useToggleReplied } from '../hooks/useMessages';
import Button from './Button';
import Skeleton from './Skeleton';
import StateMessage from './StateMessage';

export default function MessagesPanel() {
  const { data, isLoading, isError, error, refetch } = useMessages();
  const toggle = useToggleReplied();

  if (isLoading) {
    return (
      <div className="stack" role="status" aria-label="Carregando mensagens">
        <Skeleton height="6rem" />
        <Skeleton height="6rem" />
      </div>
    );
  }

  if (isError) {
    return (
      <StateMessage
        title="Não consegui carregar as mensagens"
        message={error.message}
        action={<Button onClick={() => refetch()}>Tentar de novo</Button>}
      />
    );
  }

  if (!data.length) {
    return (
      <StateMessage
        title="Nenhuma mensagem ainda"
        message="Quando alguém usar o formulário de contato, a mensagem aparece aqui."
      />
    );
  }

  return (
    <ul className="stack list-reset">
      {data.map((item) => (
        <li key={item.id} className={`message ${item.replied ? 'message--done' : ''}`}>
          <p className="message__head">
            <strong>{item.name}</strong> ({item.email}) em{' '}
            {new Date(item.created_at).toLocaleString('pt-BR')}
          </p>
          <p className="message__body">{item.message}</p>
          <Button
            variant="ghost"
            loading={toggle.isPending && toggle.variables?.id === item.id}
            onClick={() => toggle.mutate({ id: item.id, replied: !item.replied })}
          >
            {item.replied ? 'Marcar como pendente' : 'Marcar como respondida'}
          </Button>
        </li>
      ))}
    </ul>
  );
}
