import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { expensesRoutes } from './routes/expenses';

export const app = new Hono();

app.use('*', logger());

app.route('/api/expenses', expensesRoutes);

app.get('*', serveStatic({ root: './client/dist' }));
app.get('*', serveStatic({ path: './client/dist/index.html' }));
