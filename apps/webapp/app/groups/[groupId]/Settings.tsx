"use client"

import { SBGroup } from "@/utils/api/_types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { useState } from "react";
import { updateGroup } from "@/utils/api/updateGroup";

type SettingsProps = {
  group: SBGroup
}

const Settings = ({group}: SettingsProps) => {
  const supabase = createClient();
  const queryClient = useQueryClient()

  const [newName, setNewName] = useState(group.name)

  const updateGroupMutation = useMutation({
    mutationKey: ["groups", group.id],
    mutationFn: async (update: { name?: string }) => {
      await updateGroup(supabase, {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(newName === group.name) return

    updateGroupMutation.mutate({
      name: newName
    })
  }

  return <div className="flex flex-col gap-2">
    <div className="bg-muted rounded-md p-4">
      <h3 className="font-black pb-2">Name</h3>
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <Input value={newName} onChange={e => setNewName(e.target.value)} />
        <Button type="submit">Update</Button>
      </form>
    </div>
    <div className="bg-muted rounded-md p-4">
      <h3 className="font-black pb-2">Currency</h3>
      <p>{group.currency}</p>
    </div>
  </div>
}

export default Settings