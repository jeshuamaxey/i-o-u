import { SupabaseClient } from "@supabase/supabase-js";
import { NO_USER_ERROR } from "./errors";

export const getGroups = async (supabase: SupabaseClient, filters?: { archived? : boolean}) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error(NO_USER_ERROR);
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