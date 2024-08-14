"use client";

import { SyntheticEvent, useState } from "react";

import { Button } from "@repo/ui/components/ui/button";
import { Label } from "@repo/ui/components/ui/label";
import { Input } from "@repo/ui/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog"
import { createClient } from "@/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { createGroup } from "@/utils/api/createGroup";
import { useRouter } from "next/navigation";
import { createGroupMember } from "@/utils/api/createGroupMember";

const CURRENCIES = [
  { symbol: "£", value: "GBP" },
  { symbol: "$", value: "USD" },
  { symbol: "€", value: "EUR" },
]

type NewGroup = {
  name: string,
  currency: "GBP" | "USD" | "EUR",
}

const NewGroupButton = () => {
  const supabase = createClient();
  const router = useRouter();
  const [newGroup, setNewGroup] = useState<NewGroup>({
    name: "",
    currency: "GBP",
  })

  const mutation = useMutation({
    mutationFn: async (nGroup: NewGroup) => {
      const { data: { user } } = await supabase.auth.getUser();
      if(!user) {
        throw new Error("No user found")
      }

      const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      const group =  await createGroup(supabase, nGroup)
      await createGroupMember(supabase, {
        group_id: group.id,
        user_id: user.id,
        name: profile?.username || "admin"
      })

      return group

    },
    onSuccess(data, variables, context) {
      router.push(`/groups/${data.id}`)
    },
  })

  const updateCurrency = (ev: SyntheticEvent) => {
    const btn = ev.target as HTMLButtonElement
    const currency = btn.getAttribute('data-value') as NewGroup["currency"]
    if(currency) {
      setNewGroup({...newGroup, currency})
    }
  }

  const createNewGroup = async () => {
    mutation.mutate(newGroup)
  }

  return <Dialog>
    <DialogTrigger asChild>
      <Button>Create a group</Button>
    </DialogTrigger>

    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a group</DialogTitle>
        {/* <DialogDescription>
          
        </DialogDescription> */}
      </DialogHeader>
      <div className="grid w-full max-w-sm items-center gap-2">
        <Label htmlFor="name">Name</Label>
        <Input type="name" id="name" value={newGroup.name} onChange={(ev) => setNewGroup({...newGroup, name: ev.target.value})} placeholder={`Athens ${new Date().getFullYear()}`} />
      </div>

      <div className="grid w-full max-w-sm items-center gap-2">
        <Label htmlFor="currency">Currency</Label>
        <div className="flex gap-2">
          {CURRENCIES.map(({value, symbol}) => (
            <Button key={symbol} className={value === newGroup.currency ? "bg-slate-800 text-white" : ""} onClick={updateCurrency} data-value={value}>{symbol}</Button>
          ))}
        </div>
      </div>

      <Button disabled={mutation.isPending} onClick={createNewGroup}>
        {mutation.isPending ? "Creating..." : "Create group"}
        </Button>
    </DialogContent>
  </Dialog>
}

export default NewGroupButton;