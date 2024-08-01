"use client"

import { getGroupById } from "@/utils/api/getGroupById";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@repo/ui/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs"
import Expenses from "./Expenses";

const Group = () => {
  const router = useRouter();
  const supabase = createClient();
  const {groupId} = useParams<{ groupId: string }>();

  const query = useQuery({
    queryKey: ["groups", groupId],
    queryFn: async () => getGroupById(supabase, groupId)
  });

  if(query.isLoading) {
    return <div>Loading...</div>
  }

  if(query.isError) {
    console.error(query.error)
    return <div>Error: {query.error.message || "query error"}</div>
  }

  const group = query.data!;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-start items-center">
        <Button size="icon" variant="ghost" onClick={router.back}>
          <ChevronLeft />
        </Button>
        <h2 className="text-2xl font-black">{group.name}</h2>
      </div>

      <Tabs defaultValue="expenses" className="w-full">
        <TabsList className="w-full flex justify-start bg-slate-100 gap-2">
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="settleUp">Settle up</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="expenses">
          <Expenses group={group} />
        </TabsContent>
        <TabsContent value="settleUp">
          <p>settleUp</p>
        </TabsContent>
        <TabsContent value="members">
          <p>members</p>
        </TabsContent>
        <TabsContent value="settings">
          <p>members</p>
        </TabsContent>
      </Tabs>

    </div>
  )
}

export default Group;