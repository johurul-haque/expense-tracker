import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { CardSkeleton } from './components/skeletons/card-skeleton';
import { getTotalSpent } from './lib/api/get-total-spent';

function App() {
  const { isPending, data, error } = useQuery({
    queryKey: ['get-total-spent'],
    queryFn: getTotalSpent,
  });

  if (isPending) return <CardSkeleton />;

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <Card className="w-[350px] mx-auto my-10">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you've spent.</CardDescription>
      </CardHeader>
      <CardContent>{data.total}</CardContent>
    </Card>
  );
}

export default App;
