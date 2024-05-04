import { zValidator } from '@hono/zod-validator';
import { and, desc, eq, sum } from 'drizzle-orm';
import { Hono } from 'hono';
import { db } from '../../db';
import { expensesTable } from '../../db/schema/expenses';
import { authMiddleware } from '../kinde';
import { createExpensesSchema } from '../validations/expenses';

const router = new Hono();

export const expensesRoutes = router
  .use(authMiddleware)
  .get('/', async (c) => {
    const user = c.var.user;
    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .orderBy(desc(expensesTable.createdAt))
      .limit(15);

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
  .get('/total-spent', async (c) => {
    const user = c.var.user;
    const result = await db
      .select({ total: sum(expensesTable.amount) })
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id));

    return c.json(result[0]);
  })
  .get('/:id{[0-9]+}', async (c) => {
    const user = c.var.user,
      id = Number(c.req.param('id'));

    const expense = await db
      .select()
      .from(expensesTable)
      .where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id)))
      .then((res) => res[0]);

    if (!expense) {
      return c.notFound();
    }

    return c.json({ expense });
  })
  .delete('/:id{[0-9]+}', async (c) => {
    const user = c.var.user,
      id = Number(c.req.param('id'));

    const expense = await db
      .delete(expensesTable)
      .where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id)))
      .returning()
      .then((res) => res[0]);

    if (expense) {
      return c.notFound();
    }

    return c.json({ expense });
  });