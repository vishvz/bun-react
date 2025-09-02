import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name cannot be more than 100 characters')
    .trim(),
  email: z.string()
    .email('Please enter a valid email')
    .toLowerCase()
    .trim(),
  message: z.string()
    .max(500, 'Message cannot be more than 500 characters')
    .trim()
    .optional()
});

export const updateUserSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name cannot be more than 100 characters')
    .trim()
    .optional(),
  email: z.string()
    .email('Please enter a valid email')
    .toLowerCase()
    .trim()
    .optional(),
  message: z.string()
    .max(500, 'Message cannot be more than 500 characters')
    .trim()
    .optional()
});

export const userIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID format')
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserIdInput = z.infer<typeof userIdSchema>;
