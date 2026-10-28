import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { listFeatured, setFeatured } from '../services/featuredService';

export function useFeaturedNames() {
  return useQuery({
    queryKey: ['featured'],
    queryFn: listFeatured,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

export function useToggleFeatured() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ repoName, featured }) => setFeatured(repoName, featured),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['featured'] }),
  });
}
