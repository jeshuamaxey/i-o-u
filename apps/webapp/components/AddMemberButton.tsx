"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm
} from "@repo/ui/components/ui/form"
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
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { createGroupMember } from "@/utils/api/createGroupMember";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
}).required()

const AddMemberButton = ({ group, user }: { group: SBGroup, user: User }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const supabase = createClient();
  const queryClient = useQueryClient()

  const createGroupMemberMutation = useMutation({
    mutationKey: ["group", group.id],
    mutationFn: async (groupMember: z.infer<typeof formSchema>) => {
      const newMember = {
        group_id: group.id,
        name: groupMember.name,
      }
      await createGroupMember(supabase, newMember)
    },
    onSuccess: () => {
      setDialogOpen(false)
      queryClient.invalidateQueries({
        queryKey: ["groups", group.id]
      })
    }
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })
 

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
    createGroupMemberMutation.mutate(values)
  }

  return <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
    <DialogTrigger asChild>
      <Button variant="outline">Add someone to the group</Button>
    </DialogTrigger>
    <Form {...form}>
      <DialogContent className="">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <DialogHeader>
            <DialogTitle>Someone to share with</DialogTitle>
            <DialogDescription>
              Add a new member to the group
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Rafaelo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="rafaelo@tmnt.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Form>
  </Dialog>
}

export default AddMemberButton;