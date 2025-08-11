import {z} from 'zod';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type Message = z.infer<typeof MessageSchema>;

export const ChatbotInputSchema = z.object({
  history: z.array(MessageSchema).optional(),
  message: z.string(),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

export const ChatbotOutputSchema = z.object({
  response: z.string(),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;
