import { SBGroup } from "@/utils/api/_types";
import { getGroupMemberDisplayName } from "@/utils/getGroupMemberDisplayName";
import MonetaryAmount from "./MonetaryAmount";
import RowDate from "./RowDate";
import { Receipt, ReceiptEuro, ReceiptPoundSterling } from "lucide-react";
import { SplitBetween } from "@/types";
import exp from "constants";

const ReceiptIcons = {
  'USD': <Receipt size={24} className="bg-foreground/10 p-2 h-12 w-12 rounded-sm text-foreground" />,
  'GBP': <ReceiptPoundSterling size={24} className="bg-foreground/10 p-2 h-12 w-12 rounded-sm text-foreground" />,
  'EUR': <ReceiptEuro size={24} className="bg-foreground/10 p-2 h-12 w-12 rounded-sm text-foreground" />,
}

const ExpenseRow = ({expense, group, userId}: {
  expense: SBGroup["expenses"][0],
  group: SBGroup
  userId: string
}) => {
  const paidForBy = getGroupMemberDisplayName(group, expense.paid_for_by)
  const ReceiptIcon = ReceiptIcons[group.currency]

  let loan, debt, debtAmount, debtors;

  const splitBetween = expense.split_between as SplitBetween[]

  if(splitBetween && splitBetween.length > 0) {
    loan = expense.paid_for_by !== userId
      && splitBetween.find(split => split.beneficiary === userId && split.amount > 0)

    debt = expense.paid_for_by === userId
    debtAmount = splitBetween.reduce((acc, split) => {
      if(split.beneficiary === userId) return acc
      return acc + split.amount
    }, 0)
    debtors = splitBetween.filter(split => split.beneficiary !== userId).map(split => getGroupMemberDisplayName(group, split.beneficiary))
  }

  return <div key={expense.id} className="flex justify-between items-center bg-muted p-4 rounded-lg">
    <div className="flex gap-2 md:gap-4 flex-grow items-center">
      <RowDate date={new Date(expense.date)} />
      {ReceiptIcon}
      <div className="flex flex-col">
        <p>{expense.description}</p>
        <p className="text-sm">{paidForBy} paid <MonetaryAmount amount={expense.amount} currency={group.currency} /></p>
      </div>
    </div>
    <div>
      <div className={`flex flex-col text-right ${loan ? "text-green-600" : "text-red-600"}`}>
        {loan && (
          <>
            <p>You borrowed</p>
            <MonetaryAmount amount={loan.amount} currency={group.currency} />
          </>
        )}
        {debt && debtAmount && debtors && (
          <>
            <p>You lent</p>
            <MonetaryAmount amount={debtAmount} currency={group.currency} />
          </>
        )}
        </div>
    </div>
  </div>
}

export default ExpenseRow;