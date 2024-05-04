import { loadingCreateExpenseQueryOptions } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { TableCell, TableRow } from './ui/table';

export function LoadingCreatedExpense() {
  const { data: loadingCreateExpense } = useQuery(
    loadingCreateExpenseQueryOptions
  );

  if (!loadingCreateExpense?.expense) return;

  return (
    <TableRow>
      <TableCell className="font-medium">
        <Skeleton className="h-6 w-full" />
      </TableCell>

      <TableCell>{loadingCreateExpense.expense.title}</TableCell>

      <TableCell className="text-right">
        {loadingCreateExpense.expense.amount}
      </TableCell>

      <TableCell>
        <Skeleton className="h-6 w-full" />
      </TableCell>

      <TableCell>
        <Button disabled variant={'outline'} size={'icon'}>
          <Trash className="size-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
