import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { SITE } from '../config/site';

export default function Header() {
  return (
    <header className="header">
      <NavLink to="/" className="header__brand">
        {SITE.name}
      </NavLink>
      <nav className="header__nav" aria-label="Principal">
        <NavLink to="/" end>
          Início
        </NavLink>
        <NavLink to="/projetos">Projetos</NavLink>
        <NavLink to="/contato">Contato</NavLink>
      </nav>
      <ThemeToggle />
    </header>
  );
}
