import { insertExpenseSchema } from '@server/src/modules/expenses/expenses.validation';
import { api } from '.';

export async function createNewExpense(value: insertExpenseSchema) {
  const res = await api.expenses.$post({ json: value });
  if (!res.ok) throw new Error('Server Error');

  return res.json();
}
