import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loadingCreateExpenseQueryOptions } from '@/lib/api';
import { createNewExpense } from '@/lib/api/create-new-expense';
import { getAllExpensesQueryOptions } from '@/lib/api/get-all-expenses';
import { insertExpenseSchema } from '@server/src/modules/expenses/expenses.validation';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { toast } from 'sonner';

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

      navigate({ to: '/expenses' });

      const queryKey = loadingCreateExpenseQueryOptions.queryKey;

      queryClient.setQueryData(queryKey, { expense: value });

      try {
        const newExpense = await createNewExpense(value);

        queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, {
          ...existingExpenses,
          expenses: [newExpense, ...existingExpenses.expenses],
        });

        toast('Expense created', {
          description: `Successfully created new expense: ${newExpense.id}`,
        });
      } catch (error) {
        toast('Error', {
          description: 'Failed to create new Expense',
        });
      } finally {
        queryClient.setQueryData(queryKey, {});
      }
    },
  });

  return (
    <>
      <h2 className="text-center mb-2 text-lg font-medium">Create Expense</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
        className="max-w-xl flex flex-col gap-y-2.5 mx-auto"
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
                className="mt-1.5"
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
            <div>
              <Label htmlFor={field.name}>Amount</Label>
              <Input
                className="mt-1.5"
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
            </div>
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" className="mt-2" disabled={!canSubmit}>
              {isSubmitting ? '...' : 'Create Expense'}
            </Button>
          )}
        />
      </form>
    </>
  );
}
