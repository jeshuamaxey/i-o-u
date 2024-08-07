"use client"

import { SBGroup } from "@/utils/api/_types";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import { updateGroup } from "@/utils/api/updateGroup";
import { createClient } from "@/utils/supabase/client";

type SettingsProps = {
  group: SBGroup
}

const Settings = ({group}: SettingsProps) => {
  const supabase = createClient();
  const queryClient = useQueryClient()

  const updateGroupMutation = useMutation({
    mutationKey: ["groups", group.id],
    mutationFn: async (update: {
      simplified_debts_enabled?: boolean
    }) => {
      updateGroup(supabase, {
        id: group.id,
        ...update
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groups", group.id]
      })
    }
  })

  const enableSimplify = () => {
    console.log("Enable Simplify")
    updateGroupMutation.mutate({simplified_debts_enabled: true})
  }

  return <div className="flex flex-col gap-2">
    <div className="bg-foreground/5 rounded-md p-4">
      <h3 className="font-black pb-2">Currency</h3>
      <p>{group.currency}</p>
    </div>
    <div className="bg-foreground/5 rounded-md p-4">
      <div className="flex justify-between">
        <h3 className="font-black pb-2">Simplified debts</h3>
        {group.simplified_debts_enabled && (
          <Badge><CheckCircle2 className="mr-1"/> Enabled</Badge>
        )}
      </div>
      <p>Simplified debts reduces the amount of settling up needed. If Scott owes Gio £5 and Gio owes James £5, we'll figure out that Scott can pay James directly.</p>
      {!group.simplified_debts_enabled && (
        <Button onClick={enableSimplify}>Enable Simplified Debts</Button>
      )}
    </div>
  </div>
}

export default Settings