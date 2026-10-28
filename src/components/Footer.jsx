import { Link } from 'react-router-dom';
import { SITE } from '../config/site';

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        {SITE.name} - {SITE.role}
      </p>
      <p>
        <a
          href={`https://github.com/${SITE.githubUser}`}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>{' '}
        | <Link to="/dashboard">Área do dono</Link>
      </p>
    </footer>
  );
}
