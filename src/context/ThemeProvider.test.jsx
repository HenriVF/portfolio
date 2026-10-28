import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, THEME_STORAGE_KEY } from './ThemeProvider';
import { useTheme } from '../hooks/useTheme';

function Probe() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button type="button" onClick={toggleTheme}>
      tema: {theme}
    </button>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => localStorage.clear());

  it('persiste o tema escolhido e o restaura na próxima visita', async () => {
    const user = userEvent.setup();
    const first = render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );
    await user.click(screen.getByRole('button'));
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    first.unmount();

    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );
    expect(screen.getByRole('button')).toHaveTextContent('tema: dark');
  });
});
