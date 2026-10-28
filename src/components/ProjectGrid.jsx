import ProjectCard from './ProjectCard';
import ProjectSkeleton from './ProjectSkeleton';
import StateMessage from './StateMessage';
import Button from './Button';

// Cuida dos três estados de qualquer lista vinda da API: carregando, erro e vazia.
export default function ProjectGrid({
  projects,
  isLoading,
  isError,
  error,
  onRetry,
  skeletons = 3,
}) {
  if (isLoading) {
    return (
      <div className="grid">
        {Array.from({ length: skeletons }, (_, i) => (
          <ProjectSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <StateMessage
        title="Não consegui carregar os projetos"
        message={error?.message}
        action={<Button onClick={onRetry}>Tentar de novo</Button>}
      />
    );
  }

  if (!projects.length) {
    return (
      <StateMessage
        title="Nenhum projeto público ainda"
        message="Quando houver repositórios públicos no GitHub, eles aparecem aqui."
      />
    );
  }

  return (
    <div className="grid">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
