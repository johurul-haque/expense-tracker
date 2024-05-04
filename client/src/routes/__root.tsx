import { Header } from '@/components/header';
import { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

type RouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Header />
      <hr className="dark:border-gray-800" />

      <main className="container">
        <Outlet />
      </main>
    </>
  ),
});
