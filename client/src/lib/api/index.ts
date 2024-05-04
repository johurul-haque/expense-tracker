import { ApiRoutes } from '@server/src/app';
import { insertExpenseSchema } from '@server/src/modules/expenses/expenses.validation';
import { queryOptions } from '@tanstack/react-query';
import { hc } from 'hono/client';
import { getUser } from './get-user';

export const api = hc<ApiRoutes>('/').api;

export const userQueryOptions = queryOptions({
  queryKey: ['get-current-user'],
  queryFn: getUser,
  staleTime: Infinity,
});

export const loadingCreateExpenseQueryOptions = queryOptions<{
  expense?: insertExpenseSchema;
}>({
  queryKey: ['loading-create-expense'],
  queryFn: async () => ({}),
  staleTime: Infinity,
});