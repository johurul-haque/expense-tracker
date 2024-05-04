import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { authMiddleware } from '../../kinde';
import {
  createExpense,
  deleteSingleExpense,
  getExpenses,
  getSingleExpense,
  getTotalSpent,
} from './expenses.service';
import { insertExpenseSchema } from './expenses.validation';

const app = new Hono();

export const expensesRoutes = app
  .use(authMiddleware)
  .get('/', async (c) => {
    const user = c.var.user;
    const expenses = await getExpenses(user.id);

    return c.json({ expenses });
  })
  .post('/', zValidator('json', insertExpenseSchema), async (c) => {
    const expenses = c.req.valid('json'),
      user = c.var.user;

    const result = await createExpense(expenses, user.id);

    return c.json(result, 201);
  })
  .get('/total-spent', async (c) => {
    const user = c.var.user;
    const result = await getTotalSpent(user.id);

    return c.json(result[0]);
  })
  .get('/:id{[0-9]+}', async (c) => {
    const user = c.var.user,
      id = Number(c.req.param('id'));

    const expense = await getSingleExpense(user.id, id);

    if (!expense) {
      return c.notFound();
    }

    return c.json({ expense });
  })
  .delete('/:id{[0-9]+}', async (c) => {
    const user = c.var.user,
      id = Number(c.req.param('id'));

    const expense = await deleteSingleExpense(user.id, id);

    if (expense) {
      return c.notFound();
    }

    return c.json({ expense });
  });
