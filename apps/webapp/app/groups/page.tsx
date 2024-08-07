import React from "react";
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from "@/utils/react-query/get-query-client";

import GroupList from "./GroupList";
import NewGroupButton from "@/components/NewGroupButton";

export default async function GroupsPage() {
  const queryClient = getQueryClient()
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full max-w-4xl mx-auto px-8 py-4">
        <div className="flex justify-between">
         <h2 className="text-3xl font-black pb-4">Groups</h2>
         <NewGroupButton />

        </div>
        <GroupList />
      </div>
    </HydrationBoundary>
  );
}
