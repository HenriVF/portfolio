import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';

export default function ProjectCard({ project }) {
  return (
    <article className="card">
      <h3 className="card__title">
        <Link to={`/projetos/${project.name}`} className="card__link">
          {project.name}
        </Link>
      </h3>
      <p className="card__text">{project.description || 'Repositório sem descrição.'}</p>
      <p className="card__meta">
        {project.language && <span className="tag">{project.language}</span>}
        <span>Atualizado em {formatDate(project.pushedAt)}</span>
      </p>
    </article>
  );
}
