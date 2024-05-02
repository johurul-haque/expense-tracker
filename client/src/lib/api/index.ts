import { ApiRoutes } from '@server/src/app';
import { hc } from 'hono/client';

export const api = hc<ApiRoutes>('/').api;
