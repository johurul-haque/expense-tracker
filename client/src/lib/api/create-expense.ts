import { insertExpenseSchema } from '@server/src/modules/expenses/expenses.validation';
import { api } from '.';

export async function createNewExpense(value: insertExpenseSchema) {
  await new Promise((r) => setTimeout(r, 3000));
  const res = await api.expenses.$post({ json: value });
  if (!res.ok) throw new Error('Server Error');

  return res.json();
}
