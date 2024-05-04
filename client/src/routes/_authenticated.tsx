import { userQueryOptions } from '@/lib/api';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context: { queryClient } }) => {
    try {
      const data = await queryClient.fetchQuery(userQueryOptions);
      return data;
    } catch (error) {
      return { user: null };
    }
  },
  component: () => <Component />,
});

function Component() {
  const { user } = Route.useRouteContext();
  if (!user) return <a href="/api/login">Login</a>;

  return <Outlet />;
}
