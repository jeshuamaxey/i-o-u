import { SupabaseClient } from "@supabase/supabase-js";
import { NO_USER_ERROR } from "./errors";
import { Database } from "@repo/supabase-types";

type GroupMemberInsert = Database["public"]["Tables"]["group_members"]["Insert"]

export const createGroupMember = async (supabase: SupabaseClient, gm: GroupMemberInsert) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error(NO_USER_ERROR);
  }

  let req = supabase
    .from("group_members")
    .insert(gm)
    .select("*")
    .single()

  const { data, error } = await req;

  if(error) {
    throw error;
  }

  return data
}