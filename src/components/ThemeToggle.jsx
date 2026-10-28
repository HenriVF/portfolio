import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const next = theme === 'dark' ? 'claro' : 'escuro';
  return (
    <button type="button" className="theme-toggle" onClick={toggleTheme}>
      Tema {next}
    </button>
  );
}
