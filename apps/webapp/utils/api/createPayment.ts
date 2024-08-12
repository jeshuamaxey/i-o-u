import { SupabaseClient } from "@supabase/supabase-js";
import { NO_USER_ERROR } from "./errors";
import { Database } from "@repo/supabase-types";

type PaymentInsert = Database["public"]["Tables"]["payments"]["Insert"]
type PaymentInput = Omit<PaymentInsert, "id" | "created_at" | "updated_at" | "created_by">

export const createPayment = async (supabase: SupabaseClient, expense: PaymentInput) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error(NO_USER_ERROR);
  }

  const newPayment = {
    ...expense,
    created_by: user.id,
  };

  let req = supabase
    .from("payments")
    .insert(newPayment)
    .select("*")
    .single()

  const { data, error } = await req;

  if(error) {
    throw error;
  }

  return data
}