import { SupabaseClient } from "@supabase/supabase-js";
import { NO_USER_ERROR } from "./errors";
import { Database } from "@repo/supabase-types";

type GroupUpdate = Database["public"]["Tables"]["groups"]["Update"]

export const updateGroup = async (supabase: SupabaseClient, update: GroupUpdate) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error(NO_USER_ERROR);
  }

  let req = supabase
    .from("groups")
    .update(update)
    .eq("id", update.id)
    .select("*")
    .single()

  const { data, error } = await req;

  if(error) {
    throw error;
  }

  return data
}