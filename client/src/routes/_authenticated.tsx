import { buttonVariants } from '@/components/ui/button';
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
  if (!user)
    return (
      <div className="text-center">
        <a
          href="/api/login"
          className={`${buttonVariants({ size: 'sm' })} block mx-auto max-w-fit`}
        >
          Login
        </a>
      </div>
    );

  return <Outlet />;
}
