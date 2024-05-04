import { Skeleton } from '../ui/skeleton';
import { TableCell, TableRow } from '../ui/table';

export function TableRowSkeleton() {
  const rows = new Array(4).fill(0),
    columns = new Array(5).fill(0);

  return (
    <>
      {rows.map(() => (
        <TableRow>
          {columns.map(() => (
            <TableCell>
              <Skeleton className="h-6 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
