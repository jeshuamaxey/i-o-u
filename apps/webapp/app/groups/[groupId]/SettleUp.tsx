import MonetaryAmount from "@/components/MonetaryAmount";
import CreatePaymentButton from "@/components/CreatePaymentButton";
import { Debt } from "@/types";
import { SBGroup } from "@/utils/api/_types";
import { createDebtWithKey, expenseToDebts } from "@/utils/debt";
import { createDebtGraph, createListOfSettleUpPayments } from "@/utils/debt/graph";
import { getGroupMemberDisplayNameFromMembershipId, getGroupMemberDisplayNameFromUserId } from "@/utils/getGroupMemberDisplayName";
import { User } from "@supabase/supabase-js";

const SettleUp = ({group, userId}: {group: SBGroup, userId: User["id"]}) => {
  const paymentDebts = group.payments.map(p => createDebtWithKey({
      amount: p.amount,
      creditor: p.paid_from,
      debtor: p.paid_to,
      expenseId: p.id
    })
  )

  const expenseDebts: Debt[] = group.expenses.map(expenseToDebts)
  .flat()
  .filter(d => d !== null)

  const allDebts = [...expenseDebts, ...paymentDebts]

  const graph = createDebtGraph(allDebts)
  const settleUpPayments = createListOfSettleUpPayments(graph, group)

  return <div className="flex flex-col gap-2">
    {settleUpPayments.length === 0 && (
      <div className="bg-muted p-8 text-center rounded-md">
        <h3>All settled up!</h3>
      </div>
    )}

    {settleUpPayments.map(payment => {
      const key = payment.paid_from + payment.paid_to
      const creditor = userId === payment.paid_to ? "you" : getGroupMemberDisplayNameFromMembershipId(group, payment.paid_to)
      const debtor = userId === payment.paid_from ? "you" : getGroupMemberDisplayNameFromMembershipId(group, payment.paid_from)
      const owes = debtor === "you" ? "owe" : "owes";

      return <div key={key} className="flex justify-between items-center bg-muted p-4 rounded-lg">
        <p>
          <span className="font-bold capitalize">{debtor}</span>
          <span> {owes} </span>
          <span className="font-bold">{creditor}</span> <MonetaryAmount amount={payment.amount} currency={group.currency} />
        </p>
        <CreatePaymentButton group={group} userId={userId} payment={payment} />
      </div>
    })}
  </div>;
}

export default SettleUp;
