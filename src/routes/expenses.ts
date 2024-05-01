import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { createExpensesSchema } from '../validations/expenses';

const router = new Hono();

const fakeExpenses = [
  { id: 1, title: 'Groceries', amount: 50 },
  { id: 2, title: 'Utilities', amount: 100 },
  { id: 3, title: 'Rent', amount: 1000 },
];

router.get('/', (c) => {
  return c.json({ expenses: fakeExpenses });
});

router.post('/', zValidator('json', createExpensesSchema), async (c) => {
  const expenses = c.req.valid('json');
  fakeExpenses.push({ ...expenses, id: fakeExpenses.length });

  return c.json({ expenses });
});

router.get('/:id{[0-9]+}', (c) => {
  const id = Number(c.req.param('id'));
  const expenses = fakeExpenses.find((exp) => exp.id === id);

  if (!expenses) {
    return c.notFound();
  }

  return c.json({ expenses });
});

router.delete('/:id{[0-9]+}', (c) => {
  const id = Number(c.req.param('id'));
  const index = fakeExpenses.findIndex((exp) => exp.id === id);

  if (index === -1) {
    return c.notFound();
  }

  const deletedExpense = fakeExpenses.splice(index, 1)[0];
  return c.json({ expense: deletedExpense });
});

export const expensesRoutes = router;
