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
import { getAllExpenses } from '@/lib/api/get-all-expenses';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/expenses')({
  component: () => <Expenses />,
});

function Expenses() {
  const { isPending, data, error } = useQuery({
    queryKey: ['get-all-expenses'],
    queryFn: getAllExpenses,
  });

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <Table className="max-w-3xl mx-auto">
      <TableCaption>A list of all your expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Amount</TableHead>
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
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
