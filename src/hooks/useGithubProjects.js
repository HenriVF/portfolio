import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '../services/githubService';
import { SITE } from '../config/site';

// Uma única chave de cache: navegar entre páginas não repete a requisição ao GitHub.
export function useGithubProjects() {
  return useQuery({
    queryKey: ['github-projects', SITE.githubUser],
    queryFn: () => fetchProjects(SITE.githubUser),
    staleTime: 10 * 60 * 1000,
    retry: (count, error) => !error.rateLimited && count < 1,
  });
}
