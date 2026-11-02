import { useState } from 'react';
import Button from '../components/Button';
import MessagesPanel from '../components/MessagesPanel';
import FeaturedPanel from '../components/FeaturedPanel';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [tab, setTab] = useState('messages');

  return (
    <section className="section">
      <div className="dash-head">
        <div>
          <h1>Dashboard</h1>
          <p className="muted">Conectado como {user?.email}</p>
        </div>
        <Button variant="ghost" onClick={signOut}>
          Sair
        </Button>
      </div>

      <div className="actions" role="group" aria-label="Seções do dashboard">
        <Button
          variant={tab === 'messages' ? 'primary' : 'ghost'}
          aria-pressed={tab === 'messages'}
          onClick={() => setTab('messages')}
        >
          Mensagens
        </Button>
        <Button
          variant={tab === 'featured' ? 'primary' : 'ghost'}
          aria-pressed={tab === 'featured'}
          onClick={() => setTab('featured')}
        >
          Projetos em destaque
        </Button>
      </div>

      {tab === 'messages' ? <MessagesPanel /> : <FeaturedPanel />}
    </section>
  );
}
