import { SupabaseClient } from "@supabase/supabase-js";

export const getGroupById = async (supabase: SupabaseClient, groupId: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  let req = supabase
    .from("groups")
    .select("*, group_members(*), expenses(*)")
    .filter("owner_id", "eq", user.id)
    .filter("id", "eq", groupId)
    .single();

  const { data, error } = await req;

  if(error) {
    throw error;
  }

  return data
}