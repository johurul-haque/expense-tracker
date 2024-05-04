import { TableRowSkeleton } from '@/components/skeletons/table-row-skeletons';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getAllExpensesQueryOptions } from '@/lib/api/get-all-expenses';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/expenses')({
  component: () => <Expenses />,
});

function Expenses() {
  const { isPending, data, error } = useQuery(getAllExpensesQueryOptions);

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <Table className="max-w-3xl mx-auto">
      <TableCaption>A list of all your expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isPending ? (
          <TableRowSkeleton />
        ) : (
          data.expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell className="font-medium">{expense.id}</TableCell>
              <TableCell>{expense.title}</TableCell>
              <TableCell className="text-right">{expense.amount}</TableCell>
              <TableCell>{expense.createdAt?.split('T')[0]}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
