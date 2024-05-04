import { deleteExpense } from "@/lib/api/delete-expense";
import { getAllExpensesQueryOptions } from "@/lib/api/get-all-expenses";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

export function ExpenseDeleteButton({ id }: { id: number }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteExpense,
    onError: () => {
      toast('Error', {
        description: `Failed to delete expense: ${id}`,
      });
    },
    onSuccess: () => {
      toast('Expense Deleted', {
        description: `Successfully deleted expense: ${id}`,
      });

      queryClient.setQueryData(
        getAllExpensesQueryOptions.queryKey,
        (existingExpenses) => ({
          ...existingExpenses,
          expenses: existingExpenses!.expenses.filter((e) => e.id !== id),
        })
      );
    },
  });

  return (
    <Button
      disabled={isPending}
      onClick={() => mutate(id)}
      variant={'outline'}
      size={'icon'}
    >
      <Trash className="size-4" />
    </Button>
  );
}
