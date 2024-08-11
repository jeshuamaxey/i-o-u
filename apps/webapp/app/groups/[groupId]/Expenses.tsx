import CreateExpenseButton from "@/components/CreateExpenseButton";
import MonetaryAmount from "@/components/MonetaryAmount";
import { SBGroup } from "@/utils/api/_types";
import { User } from "@supabase/supabase-js";

const Expenses = ({group, user}: {group: SBGroup, user: User}) => {
  const getGroupMemberById = (id: string) => {
    return group.group_members.find(gm => gm.user_id === id)
  }

  const expenses = [...group.expenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return <div className="flex flex-col gap-2">
    {expenses.length === 0 && (
      <div className="bg-muted p-8 text-center rounded-md">
        <h3>No expenses created yet</h3>
        <CreateExpenseButton group={group} user={user}/>
      </div>
    )}

    {expenses.length > 0 && (
      <div className="flex justify-around items-center bg-muted p-4 rounded-lg">
        <CreateExpenseButton group={group} user={user}/>
      </div>
    )}

    {expenses.map(expense => {
      const paidForBy = getGroupMemberById(expense.paid_for_by)

      return <div key={expense.id} className="flex justify-between items-center bg-muted p-4 rounded-lg">
        <div className="flex gap-2">
          <p>{new Date(expense.date).toDateString()}</p>
          <p>{expense.description}</p>
          <p>{paidForBy?.profiles?.username || paidForBy?.name}</p>
        </div>
        <div>
          <p><MonetaryAmount amount={expense.amount} currency={group.currency} /> </p>
        </div>
      </div>
    })}
  </div>;
}

export default Expenses;

