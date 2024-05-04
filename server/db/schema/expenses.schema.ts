import * as d from 'drizzle-orm/pg-core';

export const expensesTable = d.pgTable(
  'expenses',
  {
    id: d.serial('id').primaryKey(),
    title: d.text('title').notNull(),
    amount: d.numeric('amount', { precision: 12, scale: 2 }).notNull(),
    userId: d.text('user_id').notNull(),
    createdAt: d.timestamp('created_at').defaultNow(),
  },
  (expenses) => {
    return {
      userIdIndex: d.index('userId_idx').on(expenses.userId),
    };
  }
);
