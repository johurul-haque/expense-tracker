import { queryOptions } from '@tanstack/react-query';
import { api } from '.';

export async function getAllExpenses() {
  const res = await api.expenses.$get();
  return res.json();
}

export const getAllExpensesQueryOptions = queryOptions({
  queryKey: ['get-all-expenses'],
  queryFn: getAllExpenses,
  staleTime: 1000 * 60 * 5,
});