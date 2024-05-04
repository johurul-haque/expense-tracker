import { ApiRoutes } from '@server/src/app';
import { queryOptions } from '@tanstack/react-query';
import { hc } from 'hono/client';
import { getUser } from './get-user';

export const api = hc<ApiRoutes>('/').api;

export const userQueryOptions = queryOptions({
  queryKey: ['get-current-user'],
  queryFn: getUser,
  staleTime: Infinity,
});