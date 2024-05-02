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

export const Route = createFileRoute('/')({
  component: () => <Index />,
});

function Index() {
  const { isPending, data, error } = useQuery({
    queryKey: ['get-total-spent'],
    queryFn: getTotalSpent,
  });

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <Card className="w-[350px] mx-auto my-10">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you've spent.</CardDescription>
      </CardHeader>

      <CardContent>
        {isPending ? <Skeleton className="h-6 w-12" /> : data.total}
      </CardContent>
    </Card>
  );
}
