import { api } from '.';

export async function getTotalSpent() {
  const res = await api.expenses['total-spent'].$get();
  if (!res.ok) throw new Error('Server Error');
  return res.json();
}
