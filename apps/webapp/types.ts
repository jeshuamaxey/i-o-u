import { Database } from "@repo/supabase-types"

export type SplitBetween = {
  beneficiary: string
  amount: number
}

export type Debt = {
  key: string
  debtor: string
  creditor: string
  amount: number
  expenseId: string
}