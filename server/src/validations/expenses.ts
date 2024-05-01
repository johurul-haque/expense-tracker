import { z } from 'zod';

export const createExpensesSchema = z.object({
  title: z.string(),
  amount: z.number(),
});
