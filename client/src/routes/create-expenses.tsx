import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/create-expenses')({
  component: () => <CreateExpense />,
});

function CreateExpense() {
  return <div>Hello /create-expenses!</div>;
}
