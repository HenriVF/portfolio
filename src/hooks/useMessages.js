import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { listMessages, setReplied } from '../services/messagesService';

export function useMessages() {
  return useQuery({ queryKey: ['messages'], queryFn: listMessages });
}

export function useToggleReplied() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, replied }) => setReplied(id, replied),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['messages'] }),
  });
}
