import { Link } from 'react-router-dom';
import Button from '../components/Button';
import ProjectGrid from '../components/ProjectGrid';
import { useHomeProjects } from '../hooks/useHomeProjects';
import { SITE } from '../config/site';

function handleMove(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
}

export default function Home() {
  const { projects, isLoading, isError, error, refetch } = useHomeProjects();

  return (
    <>
      <section className="hero" onMouseMove={handleMove}>
        <p className="hero__role">{SITE.role}</p>
        <h1 className="hero__title">
          {SITE.name} cria interfaces que carregam rápido e se explicam sozinhas.
        </h1>
        <p className="hero__intro">{SITE.intro}</p>
        <div className="actions">
          <Button as={Link} to="/projetos">
            Ver projetos
          </Button>
          <Button as={Link} to="/contato" variant="ghost">
            Falar comigo
          </Button>
        </div>
      </section>

      <section className="section" aria-labelledby="destaques">
        <h2 id="destaques">Projetos em destaque</h2>
        <ProjectGrid
          projects={projects}
          isLoading={isLoading}
          isError={isError}
          error={error}
          onRetry={refetch}
        />
      </section>
    </>
  );
}
