import { useGithubProjects } from '../hooks/useGithubProjects';
import { useFeaturedNames, useToggleFeatured } from '../hooks/useFeatured';
import Button from './Button';
import Skeleton from './Skeleton';
import StateMessage from './StateMessage';

export default function FeaturedPanel() {
  const github = useGithubProjects();
  const featured = useFeaturedNames();
  const toggle = useToggleFeatured();

  if (github.isLoading || featured.isLoading) {
    return (
      <div className="stack" role="status" aria-label="Carregando projetos">
        <Skeleton height="2.4rem" />
        <Skeleton height="2.4rem" />
        <Skeleton height="2.4rem" />
      </div>
    );
  }

  const failure = github.error || featured.error;
  if (failure) {
    return (
      <StateMessage
        title="Não consegui carregar os projetos"
        message={failure.message}
        action={
          <Button
            onClick={() => {
              github.refetch();
              featured.refetch();
            }}
          >
            Tentar de novo
          </Button>
        }
      />
    );
  }

  if (!github.data.length) {
    return <StateMessage title="Nenhum projeto público encontrado" />;
  }

  const selected = featured.data ?? [];
  return (
    <div>
      <p className="muted">Os marcados aparecem em destaque na página inicial.</p>
      <ul className="stack list-reset">
        {github.data.map((project) => (
          <li key={project.id} className="check">
            <label>
              <input
                type="checkbox"
                checked={selected.includes(project.name)}
                disabled={toggle.isPending}
                onChange={(event) =>
                  toggle.mutate({
                    repoName: project.name,
                    featured: event.target.checked,
                  })
                }
              />
              {project.name}
            </label>
          </li>
        ))}
      </ul>
      {toggle.isError && (
        <p className="feedback feedback--error" role="alert">
          {toggle.error.message}
        </p>
      )}
    </div>
  );
}
