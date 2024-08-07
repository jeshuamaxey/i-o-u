import MonetaryAmount from "@/components/MonetaryAmount";
import { SBGroup } from "@/utils/api/_types";
import { Button } from "@repo/ui/components/ui/button";

const Expenses = ({group}: {group: SBGroup}) => {
  return <div className="flex flex-col gap-2">
    {group.expenses.length === 0 && (
      <div className="bg-foreground/5 p-8 text-center rounded-md">
        <h3>No expenses created yet</h3>
        <Button>Create expense</Button>
      </div>
    )}
    {group.expenses.map(expense => {
      return <div key={expense.id} className="flex justify-between items-center bg-foreground/5 p-4 rounded-lg">
        <div className="flex gap-2">
          <p>{new Date(expense.date).toDateString()}</p>
          <p>{expense.description}</p>
          <p>{expense.paid_for_by_profile?.username}</p>
        </div>
        <div>
          <p><MonetaryAmount amount={expense.amount} currency={group.currency} /> </p>
        </div>
      </div>
    })}
  </div>;
}

export default Expenses;