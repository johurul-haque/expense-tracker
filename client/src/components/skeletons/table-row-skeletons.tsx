import { Skeleton } from '../ui/skeleton';
import { TableCell, TableRow } from '../ui/table';

export function TableRowSkeleton() {
  const array = new Array(5).fill(0);

  return (
    <>
      {array.map(() => (
        <TableRow>
          <TableCell>
            <Skeleton className="h-6 w-full" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-6 w-full" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-6 w-full" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
