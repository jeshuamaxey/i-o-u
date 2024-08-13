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
import { currencySymbols } from "@/utils/currencies";
import { Database } from "@repo/supabase-types";
import { getGroupMemberDisplayName } from "@/utils/getGroupMemberDisplayName";

type PaymentInsert = Database["public"]["Tables"]["payments"]["Insert"]

const RecordPaymentButton = ({ group, userId, payment }: { group: SBGroup, userId: User["id"], payment: Omit<PaymentInsert, "created_by" | "date"> }) => {
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
      date: todaysDate,
      ...payment,
    })
  }

  const to = userId === payment.paid_to ? "you" : getGroupMemberDisplayName(group, payment.paid_to)
  const from = userId === payment.paid_from ? "you" : getGroupMemberDisplayName(group, payment.paid_from)

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
              Confirm {from} paid {to} {currencySymbols[group.currency]}{payment.amount}
            </>
          }
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
}

export default RecordPaymentButton;