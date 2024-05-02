import { api } from '.';

export async function getAllExpenses() {
  const res = await api.expenses.$get();
  return res.json();
}
