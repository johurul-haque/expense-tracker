import { and, desc, eq, sum } from 'drizzle-orm';
import { db } from '../../../db';
import { expensesTable } from '../../../db/schema/expenses.schema';
import { insertExpenseSchema } from './expenses.validation';

export function getExpenses(userId: string) {
  return db
    .select()
    .from(expensesTable)
    .where(eq(expensesTable.userId, userId))
    .orderBy(desc(expensesTable.createdAt))
    .limit(15);
}

export async function getSingleExpense(userId: string, expenseId: number) {
  return db
    .select()
    .from(expensesTable)
    .where(
      and(eq(expensesTable.userId, userId), eq(expensesTable.id, expenseId))
    )
    .then((res) => res[0]);
}

export function createExpense(payload: insertExpenseSchema, userId: string) {
  return db
    .insert(expensesTable)
    .values({
      ...payload,
      userId,
    })
    .returning()
    .then((res) => res[0]);
}

export function getTotalSpent(userId: string) {
  return db
    .select({ total: sum(expensesTable.amount) })
    .from(expensesTable)
    .where(eq(expensesTable.userId, userId));
}

export async function deleteSingleExpense(userId: string, expenseId: number) {
  return db
    .delete(expensesTable)
    .where(
      and(eq(expensesTable.userId, userId), eq(expensesTable.id, expenseId))
    )
    .returning()
    .then((res) => res[0]);
}
