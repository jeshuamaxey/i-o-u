import { SupabaseClient } from "@supabase/supabase-js";
import { NO_USER_ERROR } from "./errors";
import { Database } from "@repo/supabase-types";

type GroupInsert = Database["public"]["Tables"]["groups"]["Insert"]

export const createGroup = async (supabase: SupabaseClient, group: Pick<GroupInsert, "currency" | "name">) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error(NO_USER_ERROR);
  }

  const newGroup = {
    ...group,
    owner_id: user.id,
  };

  let req = supabase
    .from("groups")
    .insert(newGroup)
    .select("*")
    .single()

  const { data, error } = await req;

  if(error) {
    throw error;
  }

  return data
}