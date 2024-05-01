import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { expensesRoutes } from './routes/expenses';

export const app = new Hono();

app.use('*', logger());

app.route('/api/expenses', expensesRoutes);
