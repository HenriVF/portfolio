import { Link, useParams } from 'react-router-dom';
import Button from '../components/Button';
import Skeleton from '../components/Skeleton';
import StateMessage from '../components/StateMessage';
import NotFound from './NotFound';
import { useGithubProjects } from '../hooks/useGithubProjects';
import { formatDate } from '../utils/formatDate';

export default function ProjectDetail() {
  const { name } = useParams();
  const { data, isLoading, isError, error, refetch } = useGithubProjects();

  if (isLoading) {
    return (
      <section className="section stack" role="status" aria-label="Carregando projeto">
        <Skeleton height="2.4rem" width="50%" />
        <Skeleton height="5rem" />
      </section>
    );
  }

  if (isError) {
    return (
      <StateMessage
        title="Não consegui carregar o projeto"
        message={error.message}
        action={<Button onClick={() => refetch()}>Tentar de novo</Button>}
      />
    );
  }

  const project = data.find((item) => item.name === name);
  if (!project) return <NotFound />;

  return (
    <article className="section stack">
      <Link to="/projetos">Voltar para projetos</Link>
      <h1>{project.name}</h1>
      <p>{project.description || 'Repositório sem descrição.'}</p>
      <p className="card__meta">
        {project.language && <span className="tag">{project.language}</span>}
        <span>Atualizado em {formatDate(project.pushedAt)}</span>
        <span>{project.stars} estrelas</span>
      </p>
      {project.topics.length > 0 && (
        <p className="card__meta">
          {project.topics.map((topic) => (
            <span key={topic} className="tag">
              {topic}
            </span>
          ))}
        </p>
      )}
      <div className="actions">
        <Button as="a" href={project.url} target="_blank" rel="noreferrer">
          Ver no GitHub
        </Button>
        {project.homepage && (
          <Button
            as="a"
            href={project.homepage}
            target="_blank"
            rel="noreferrer"
            variant="ghost"
          >
            Abrir o site
          </Button>
        )}
      </div>
    </article>
  );
}
