import { Header } from '@/components/header';
import { Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <hr className="dark:border-gray-800" />
      <Outlet />
    </>
  ),
});
