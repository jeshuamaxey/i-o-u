import MonetaryAmount from "@/components/MonetaryAmount";
import { Database } from "@repo/supabase-types";

type Group = Database["public"]["Tables"]["groups"]["Row"];
type Expense = Database["public"]["Tables"]["expenses"]["Row"];

type SBGroup = Group & {
  expenses: Expense[];
}

const Expenses = ({group}: {group: SBGroup}) => {
  return <div className="flex flex-col gap-2">
    {group.expenses.map(expense => {
      return <div key={expense.id} className="flex justify-between items-center bg-slate-100 p-2 rounded-lg">
        <div className="flex gap-2">
          <p>{new Date(expense.date).toDateString()}</p>
          <p>{expense.description}</p>
        </div>
        <div>
          <p><MonetaryAmount amount={expense.amount} currency={group.currency} /> </p>
        </div>
      </div>
    })}
  </div>;
}

export default Expenses;