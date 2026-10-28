import ProjectGrid from '../components/ProjectGrid';
import { useGithubProjects } from '../hooks/useGithubProjects';

export default function Projects() {
  const { data = [], isLoading, isError, error, refetch } = useGithubProjects();
  return (
    <section className="section">
      <h1>Projetos</h1>
      <p className="muted">Carregados direto da API do GitHub, sem cadastro manual.</p>
      <ProjectGrid
        projects={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
        onRetry={refetch}
        skeletons={6}
      />
    </section>
  );
}
