import { userQueryOptions } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/profile')({
  component: () => <Profile />,
});

function Profile() {
  const { isPending, data, error } = useQuery(userQueryOptions);

  if (isPending) return 'loading...';
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="p-2">
      <p>Hello {data.user.family_name}</p>
      <a href="/api/logout">Logout</a>
    </div>
  );
}
