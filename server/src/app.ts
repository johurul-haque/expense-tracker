import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { authRoutes } from './routes/auth';
import { expensesRoutes } from './routes/expenses';

export const app = new Hono();

app.use('*', logger());

const apiRoutes = app
  .basePath('/api')
  .route('/', authRoutes)
  .route('/expenses', expensesRoutes);

app.get('*', serveStatic({ root: './client/dist' }));
app.get('*', serveStatic({ path: './client/dist/index.html' }));

export type ApiRoutes = typeof apiRoutes;