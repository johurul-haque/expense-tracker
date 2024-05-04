import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/lib/api';
import { getAllExpensesQueryOptions } from '@/lib/api/get-all-expenses';
import { insertExpenseSchema } from '@server/src/modules/expenses/expenses.validation';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-form-adapter';

export const Route = createFileRoute('/_authenticated/create-expenses')({
  component: () => <CreateExpense />,
});

function CreateExpense() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      title: '',
      amount: '',
    },
    onSubmit: async ({ value }) => {
      // This should be declared before sending post request, otherwise this might fetch data with the newly added expense
      const existingExpenses = await queryClient.ensureQueryData(
        getAllExpensesQueryOptions
      );

      const res = await api.expenses.$post({ json: value });
      if (!res.ok) throw new Error('Server Error');

      navigate({ to: '/expenses' });

      const newExpense = await res.json();

      queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, {
        ...existingExpenses,
        expenses: [newExpense, ...existingExpenses.expenses],
      });
    },
  });

  return (
    <>
      <h2 className="text-center mt-6 mb-2">Create Expense</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
        className="max-w-xl flex flex-col gap-y-3 mx-auto"
      >
        <form.Field
          name="title"
          validators={{
            onSubmit: insertExpenseSchema.shape.title,
          }}
          children={(field) => (
            <div>
              <Label htmlFor={field.name}>Title</Label>
              <Input
                className="mb-1"
                type="text"
                id={field.name}
                name={field.name}
                placeholder="Title"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />

              {field.state.meta.touchedErrors && (
                <em>{field.state.meta.touchedErrors}</em>
              )}
            </div>
          )}
        />

        <form.Field
          name="amount"
          validators={{
            onChange: insertExpenseSchema.shape.amount,
          }}
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Amount</Label>
              <Input
                className="mb-1"
                type="number"
                id={field.name}
                name={field.name}
                placeholder="Amount"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />

              {field.state.meta.touchedErrors && (
                <em>{field.state.meta.touchedErrors}</em>
              )}
            </>
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? '...' : 'Create Expense'}
            </Button>
          )}
        />
      </form>
    </>
  );
}
