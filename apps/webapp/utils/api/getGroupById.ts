import { Database } from "@repo/supabase-types";
import { SupabaseClient } from "@supabase/supabase-js";
import { GROUP_SELECT } from "./_queries";
import { SBGroup } from "./_types";

export const getGroupById = async (supabase: SupabaseClient, groupId: string): Promise<SBGroup>  => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  let req = supabase
    .from("groups")
    .select(GROUP_SELECT)
    .filter("owner_id", "eq", user.id)
    .filter("id", "eq", groupId)
    .single<SBGroup>();

  const { data, error } = await req;

  if(error) {
    throw error;
  }

  return data
}