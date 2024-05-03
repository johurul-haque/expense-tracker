import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@tanstack/react-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/create-expenses')({
  component: () => <CreateExpense />,
});

function CreateExpense() {
  const form = useForm({
    defaultValues: {
      title: '',
      amount: 0,
    },
    onSubmit: ({ value }) => {
      console.log(value);
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
        className="max-w-xl mx-auto"
      >
        <form.Field
          name="title"
          children={(field) => (
            <>
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
            </>
          )}
        />

        <form.Field
          name="amount"
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
                onChange={(e) => field.handleChange(+e.target.value)}
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
            <Button type="submit" className="mt-4" disabled={!canSubmit}>
              {isSubmitting ? '...' : 'Create Expense'}
            </Button>
          )}
        />
      </form>
    </>
  );
}
