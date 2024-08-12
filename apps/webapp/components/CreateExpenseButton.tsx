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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@repo/ui/components/ui/toggle-group"
import { SBGroup } from "@/utils/api/_types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExpense } from "@/utils/api/createExpense";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { ChangeEvent, useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";

const formSchema = z.object({
  description: z.string(),
  amount: z.coerce.number().min(0),
  date: z.string().date(),
  paid_for_by: z.string(),
  split_between: z.array(
    z.object({
      beneficiary: z.string(),
      amount: z.coerce.number().min(0),
    })
  ),
}).required()

const currencySymbols = {
  'USD': '$',
  'EUR': '€',
  'GBP': '£',
}

const CreateExpenseButton = ({ group, user }: { group: SBGroup, user: User }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const supabase = createClient();
  const todaysDate = new Date().toISOString().split('T')[0]
  const queryClient = useQueryClient()

  const createExpenseMutation = useMutation({
    mutationKey: ["group", group.id, "expenses"],
    mutationFn: async (expense: z.infer<typeof formSchema>) => {
      console.warn("FAKING split_between")
      
      const newExpense = {
        created_by: user.id,
        group_id: group.id,
        ...expense,
      }
      await createExpense(supabase, newExpense)
    },
    onSuccess: () => {
      setDialogOpen(false)
      queryClient.invalidateQueries({
        queryKey: ["groups", group.id]
      })
    }
  })

  const defaultSplitBetween = group.group_members.map(gm => {
    return {
      beneficiary: gm.user_id,
      amount: 0
    }
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      date: todaysDate,
      amount: 0,
      paid_for_by: user.id,
      split_between: defaultSplitBetween
    },
  })
 

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)

    createExpenseMutation.mutate(values)
  }

  return <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
    <DialogTrigger asChild>
      <Button variant="outline">Add expense</Button>
    </DialogTrigger>
    <Form {...form}>
      <DialogContent className="">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <DialogHeader>
            <DialogTitle>Add expense</DialogTitle>
            <DialogDescription>
              Add a new expense to the group
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="paid_for_by"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paid for by</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="You" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {group.group_members.map(gm => {
                        const name = gm.user_id === user.id ? "You" : gm.profiles?.username
                        return <SelectItem key={gm.user_id} value={gm.user_id}>{name}</SelectItem>
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Pizza for Michelangelo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => {
                const handleChange = (ev: ChangeEvent) => {
                  const target = ev.target as HTMLInputElement
                  const amount = target.value
                  const splits = form.getValues('split_between')
                  target.validity.valid && field.onChange(amount)

                  const equalAmount = (parseFloat(amount) || 0)/(splits.length || 1)
                  const newSplits = splits.map(s => {
                    return {...s, amount: equalAmount}
                  })
                  form.setValue('split_between', newSplits)
                }

                return (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <span className="text-gray-500 pl-0 pr-2">{currencySymbols[group.currency]}</span>
                      <Input
                        placeholder={`33.69`}
                        type="number"
                        inputMode="numeric"
                        min={0}
                        step={0.01}
                        {...field}
                        pattern="[0-9]*"
                        onChange={handleChange}  />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Input type="date" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="split_between"
              render={({ field }) => {
                const handleValueChange = (userIds: string[]) => {
                  const equalAmount = form.getValues('amount')/(userIds.length || 1)
                  console.log({equalAmount})
                  const splits = userIds.map(u => {
                    return {beneficiary: u, amount: equalAmount}
                  })
                  field.onChange(splits)
                }

                const defaultValue = defaultSplitBetween.map(s => s.beneficiary)
                return (
                  <FormItem>
                    <FormLabel>Split</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Tabs defaultValue="equally" className="w-full">
                          <TabsList className="w-full flex justify-start gap-2">
                            <TabsTrigger value="equally">Split equally</TabsTrigger>
                            <TabsTrigger value="byPercent">Split by percentages</TabsTrigger>
                          </TabsList>
                          <TabsContent value="equally">
                            <ToggleGroup defaultValue={defaultValue} className="justify-start" type="multiple" onValueChange={handleValueChange}>
                              {group.group_members.map(gm => {
                                const selected = field.value.find(s => s.beneficiary === gm.user_id)
                                return <ToggleGroupItem key={gm.user_id} value={gm.user_id}>
                                  {selected ? (
                                    <CheckCircle2 className="text-green-700 mr-1" />
                                  ) : (
                                    <Circle className="text-gray-500 mr-1" />
                                  )}
                                  {gm.profiles?.username || gm.name}
                                </ToggleGroupItem>
                                }
                              )}
                            </ToggleGroup>
                          </TabsContent>
                          <TabsContent value="byPercent">
                            <p>by percent</p>
                          </TabsContent>
                        </Tabs>

                        {/* <Input type="date" {...field} /> */}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}}
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

export default CreateExpenseButton;