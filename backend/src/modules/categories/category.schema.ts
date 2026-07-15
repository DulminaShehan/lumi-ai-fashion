import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(1),
  imageUrl: z.string().url().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();
