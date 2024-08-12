import CreateExpenseButton from "@/components/CreateExpenseButton";
import ExpenseRow from "@/components/ExpenseRow";
import PaymentRow from "@/components/PaymentRow";
import { SBGroup } from "@/utils/api/_types";
import { User } from "@supabase/supabase-js";

const addField = (item: any, fieldName: string, fieldValue: string) => {
  return {
    ...item,
    [fieldName]: fieldValue
  }
}

const Expenses = ({group, user}: {group: SBGroup, user: User}) => {
  const activity = [
    ...group.expenses.map(e => addField(e, 'type', 'expense')),
    ...group.payments.map(p => addField(p, 'type', 'payment'))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return <div className="flex flex-col gap-2">
    {activity.length === 0 && (
      <div className="bg-muted p-8 text-center rounded-md">
        <h3>No expenses created yet</h3>
        <CreateExpenseButton group={group} user={user}/>
      </div>
    )}

    {activity.length > 0 && (
      <div className="flex justify-around items-center bg-muted p-4 rounded-lg">
        <CreateExpenseButton group={group} user={user}/>
      </div>
    )}

    {activity.map(item => item.type === 'expense' ?
      <ExpenseRow key={item.id} expense={item as SBGroup["expenses"][0]} group={group} userId={user.id} /> :
      <PaymentRow key={item.id} payment={item as SBGroup["payments"][0]} group={group} />
    )}
  </div>;
}

export default Expenses;

