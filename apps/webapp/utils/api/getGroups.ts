import { SupabaseClient } from "@supabase/supabase-js";

export const getGroups = async (supabase: SupabaseClient, filters?: { archived? : boolean}) => {
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

  if(filters && filters.archived === true) {
    req = req.is("archived_at", null);
  }

  if(filters && filters.archived === false) {
    req = req.not("archived_at", "is", null);
  }

  const { data, error } = await req;

  if(error) {
    throw error;
  }

  return data
}