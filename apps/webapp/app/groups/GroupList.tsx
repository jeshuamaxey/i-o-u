"use client";

import { NO_USER_ERROR } from "@/utils/api/errors";
import { getGroups } from "@/utils/api/getGroups";
import { createClient } from "@/utils/supabase/client";
import { Database } from "@repo/supabase-types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Expense = Database["public"]["Tables"]["expenses"]["Row"]

const CURRENCIES: {[key: string]: string} = {
  'GBP': '£',
  'USD': '$',
  'EUR': '€'
}

const GroupList = () => {
  const router = useRouter();
  const supabase = createClient();
  const query = useQuery({
    queryKey: ["groups"],
    queryFn: async () => getGroups(supabase)
   });

  if(query.isLoading) {
    return <div>Loading...</div>
  }

  if(query.isError) {
    if(query.error.message === NO_USER_ERROR) {
      router.push("/login")
    }

    return <div>Error: {query.error.message || "query error"}</div>
  }

  const groups = query.data!;

  console.log(groups);

  const navigateTo = (groupId: string) => {
    router.push(`/groups/${groupId}`)
  }

  return (
    <div className="flex flex-col gap-2">
      {groups.map((group) => {
        const totalExpense = group.expenses.reduce((acc: number, expense: Expense) => acc + expense.amount, 0);
        
        return (
          <div key={group.id}
            onClick={() => navigateTo(group.id)}
            className={`flex flex-col gap-2 p-4 bg-background rounded-md cursor-pointer ${group.archived_at && "text-foreground/60"} hover:shadow`}>
            <div className="flex justify-between">
              <h2 className="font-bold">{group.name}</h2>
              <p>{group.archived_at && "Archived"}</p>
            </div>
            <p>
              {group.group_members.length} members
            </p>
            <p>
              {CURRENCIES[group.currency]}{totalExpense} spent
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default GroupList;