import Skeleton from './Skeleton';

// Mesma altura do ProjectCard para não haver salto de layout.
export default function ProjectSkeleton() {
  return (
    <div className="card card--skeleton" role="status" aria-label="Carregando projeto">
      <Skeleton height="1.4rem" width="60%" />
      <Skeleton height="3.2rem" />
      <Skeleton height="1rem" width="40%" />
    </div>
  );
}
