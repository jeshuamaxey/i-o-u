"use client"

import { SBGroup } from "@/utils/api/_types";
import { Button } from "@repo/ui/components/ui/button";
import { useMutation } from "@tanstack/react-query";

type SettingsProps = {
  group: SBGroup
}

const Settings = ({group}: SettingsProps) => {
  const enableSimplifyMutation = useMutation({
    mutationKey: ["groups", group.id],
    mutationFn: async () => {}
  })

  const enableSimplify = () => {
    console.log("Enable Simplify")
  }

  return <div className="flex flex-col gap-2">
    <div className="bg-foreground/5 rounded-md p-4">
      <h3 className="font-black pb-2">Currency</h3>
      <p>{group.currency}</p>
    </div>
    <div className="bg-foreground/5 rounded-md p-4">
      <h3 className="font-black pb-2">Simplified debts</h3>
      <p>Simplified debts reduces the amount of settling up needed. If Scott owes Gio £5 and Gio owes James £5, we'll figure out that Scott can pay James directly.</p>
      <Button onClick={enableSimplify}>Enabled Simplified Debts</Button>
    </div>
  </div>
}

export default Settings