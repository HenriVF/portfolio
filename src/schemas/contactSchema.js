import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'O nome precisa ter pelo menos 2 caracteres.'),
  email: z.string().trim().email('E-mail inválido.'),
  message: z.string().trim().min(20, 'A mensagem precisa ter no mínimo 20 caracteres.'),
});
