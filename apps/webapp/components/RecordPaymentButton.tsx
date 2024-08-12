"use client"

import { Button } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog"
import { SBGroup } from "@/utils/api/_types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPayment } from "@/utils/api/createPayment";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { MouseEventHandler, useState } from "react";
import { Debt } from "@/types";
import { currencySymbols } from "@/utils/currencies";
import { Database } from "@repo/supabase-types";

type PaymentInsert = Database["public"]["Tables"]["payments"]["Insert"]

const RecordPaymentButton = ({ group, userId, debt }: { group: SBGroup, userId: User["id"], debt: Debt }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const supabase = createClient();
  const todaysDate = new Date().toISOString().split('T')[0]!
  const queryClient = useQueryClient()

  const createPaymentMutation = useMutation({
    mutationKey: ["group", group.id, "payments"],
    mutationFn: async (newPayment: PaymentInsert) => {
      await createPayment(supabase, newPayment)
    },
    onSuccess: () => {
      setDialogOpen(false)
      queryClient.invalidateQueries({
        queryKey: ["groups", group.id]
      })
    }
  })
 

  const handleClick: MouseEventHandler<HTMLButtonElement> = (ev) => {
    createPaymentMutation.mutate({
      created_by: userId,
      group_id: group.id,
      date: todaysDate,
      amount: debt.amount,
      paid_from: debt.debtor,
      paid_to: debt.creditor
    })
  }

  const creditor = userId === debt.creditor ? "you" : group.group_members.find(m => m.user_id === debt.creditor)?.profiles?.username
  const debtor = userId === debt.debtor ? "you" : group.group_members.find(m => m.user_id === debt.debtor)?.profiles?.username

  return <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
    <DialogTrigger asChild>
      <Button variant="outline">Settle up</Button>
    </DialogTrigger>

    <DialogContent className="">
      <DialogHeader>
        <DialogTitle>Settle up</DialogTitle>
        <DialogDescription>
          Record a payment between two members of the group
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button onClick={handleClick}>
          {createPaymentMutation.isPending ?
            <>Loading...</> :
            <>
              Confirm {debtor} paid {creditor} {currencySymbols[group.currency]}{debt.amount}
            </>
          }
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
}

export default RecordPaymentButton;