import { useMemo } from 'react';
import { useGithubProjects } from './useGithubProjects';
import { useFeaturedNames } from './useFeatured';
import { SITE } from '../config/site';

// Projetos da home: os marcados como destaque no dashboard.
// Se não houver destaques (ou o banco estiver fora do ar), usa os mais recentes.
export function useHomeProjects() {
  const github = useGithubProjects();
  const featured = useFeaturedNames();

  const projects = useMemo(() => {
    if (!github.data) return [];
    const names = featured.data ?? [];
    const chosen = github.data.filter((project) => names.includes(project.name));
    return chosen.length ? chosen : github.data.slice(0, SITE.fallbackFeatured);
  }, [github.data, featured.data]);

  return {
    projects,
    isLoading: github.isLoading || featured.isLoading,
    isError: github.isError,
    error: github.error,
    refetch: github.refetch,
  };
}
