import { SupabaseClient } from "@supabase/supabase-js";
import { NO_USER_ERROR } from "./errors";
import { Database } from "@repo/supabase-types";

type ExpenseInsert = Database["public"]["Tables"]["expenses"]["Insert"]
type ExpenseInput = Omit<ExpenseInsert, "id" | "created_at" | "updated_at" | "created_by">

export const createExpense = async (supabase: SupabaseClient, expense: ExpenseInput) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error(NO_USER_ERROR);
  }

  const newExpense = {
    ...expense,
    created_by: user.id,
  };

  let req = supabase
    .from("expenses")
    .insert(newExpense)
    .select("*")
    .single()

  const { data, error } = await req;

  if(error) {
    throw error;
  }

  return data
}