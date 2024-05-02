import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';

export function CardSkeleton() {
  return (
    <Card className="w-[350px] mx-auto">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-2/4" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-5 w-full" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 w-12" />
      </CardContent>
    </Card>
  );
}
