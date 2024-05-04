import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { db } from '../../db';
import { expensesTable } from '../../db/schema/expenses';
import { authMiddleware } from '../kinde';
import { createExpensesSchema } from '../validations/expenses';

const router = new Hono();

const fakeExpenses = [
  { id: 1, title: 'Groceries', amount: '50' },
  { id: 2, title: 'Utilities', amount: '100' },
  { id: 3, title: 'Rent', amount: '1000' },
];

export const expensesRoutes = router
  .use(authMiddleware)
  .get('/', async (c) => {
    const user = c.var.user;
    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id));

    return c.json({ expenses });
  })
  .post('/', zValidator('json', createExpensesSchema), async (c) => {
    const expenses = c.req.valid('json'),
      user = c.var.user;

    const result = await db
      .insert(expensesTable)
      .values({
        ...expenses,
        userId: user.id,
      })
      .returning();

    return c.json(result, 201);
  })
  .get('/total-spent', (c) => {
    const total = fakeExpenses.reduce(
      (sum, expense) => sum + +expense.amount,
      0
    );
    return c.json({ total });
  })
  .get('/:id{[0-9]+}', (c) => {
    const id = Number(c.req.param('id'));
    const expenses = fakeExpenses.find((exp) => exp.id === id);

    if (!expenses) {
      return c.notFound();
    }

    return c.json({ expenses });
  })
  .delete('/:id{[0-9]+}', (c) => {
    const id = Number(c.req.param('id'));
    const index = fakeExpenses.findIndex((exp) => exp.id === id);

    if (index === -1) {
      return c.notFound();
    }

    const deletedExpense = fakeExpenses.splice(index, 1)[0];
    return c.json({ expense: deletedExpense });
  });