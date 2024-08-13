import { SBGroup } from "@/utils/api/_types"
import { getGroupMemberDisplayName } from "@/utils/getGroupMemberDisplayName"
import MonetaryAmount from "./MonetaryAmount"
import RowDate from "./RowDate"
import { BadgeDollarSign, BadgeEuro, BadgePoundSterling } from "lucide-react"

const PaymentIcons = {
  'USD': <BadgeDollarSign size={24} className="bg-foreground/10 p-2 h-12 w-12 rounded-sm text-foreground" />,
  'GBP': <BadgePoundSterling size={24} className="bg-foreground/10 p-2 h-12 w-12 rounded-sm text-foreground" />,
  'EUR': <BadgeEuro size={24} className="bg-foreground/10 p-2 h-12 w-12 rounded-sm text-foreground" />,
}

const PaymentRow = ({payment, group}: {
  payment: SBGroup["payments"][0],
  group: SBGroup
}) => {
  const paidFrom = getGroupMemberDisplayName(group, payment.paid_from)
  const paidTo = getGroupMemberDisplayName(group, payment.paid_to)
  const PaymentIcon = PaymentIcons[group.currency]

  return <div key={payment.id} className="flex justify-between items-center bg-muted p-2 md:p-4 rounded-lg">
    <div className="flex gap-2 md:gap-4 flex-grow items-center">
      <RowDate date={new Date(payment.date)} />
      {PaymentIcon}
      <p>{paidFrom} paid {paidTo}</p>
    </div>
    <div>
      <p><MonetaryAmount amount={payment.amount} currency={group.currency} /> </p>
    </div>
  </div>
}

export default PaymentRow;