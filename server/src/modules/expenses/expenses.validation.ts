import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { expensesTable } from '../../../db/schema/expenses.schema';

export const insertExpenseSchema = createInsertSchema(expensesTable, {
  title: z
    .string()
    .min(3, 'Title must be 3 characters')
    .max(100, "Title can't be more than 100 characters."),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, 'Amount must be a valid monetary value.'),
}).pick({
  title: true,
  amount: true,
});

export type insertExpenseSchema = z.infer<typeof insertExpenseSchema>;