import { api } from '.';

export async function getUser() {
  const res = await api.profile.$get();
  if (!res.ok) throw new Error('Server Error');

  return res.json();
}
