import { z } from 'zod';

export const createExpenseSchema = z.object({
  title: z.string(),
  amount: z.string(),
});
