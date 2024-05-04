import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getTotalSpent } from '@/lib/api/get-total-spent';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/')({
  component: () => <Index />,
});

function Index() {
  const { isPending, data, error } = useQuery({
    queryKey: ['get-total-spent'],
    queryFn: getTotalSpent,
  });

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <Card className="w-[350px] mx-auto text-center">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
      </CardHeader>

      <CardContent className="text-2xl font-medium">
        {isPending ? (
          <Skeleton className="h-8 w-10 mx-auto" />
        ) : (
          data.total || 0
        )}
      </CardContent>
    </Card>
  );
}
