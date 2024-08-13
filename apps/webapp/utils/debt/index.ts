import { Debt, SplitBetween } from "@/types"
import { SBGroup } from "../api/_types"

export const generateDebtKey = (debt: Pick<Debt, 'expenseId' | 'amount' | 'creditor' | 'debtor'>) => {
  return debt.expenseId+debt.creditor+debt.debtor+debt.amount
}

export const createDebtWithKey = (debt: Pick<Debt, 'expenseId' | 'amount' | 'creditor' | 'debtor'>) => {
  return {
    key: generateDebtKey(debt),
    ...debt
  }
}

/**
 * Returns a list of debts based on the split of a group expense.
 * Returns null for a group expense that doesn't have a split_between property
 * 
 * @param ex A group expense with a split_between property
 * @returns Debt[] | null
 */
export const expenseToDebts = (ex: SBGroup["expenses"][0]) => {
  if(!ex.split_between) {
    return null
  }

  const splits = (ex.split_between as SplitBetween[]).filter(split => split.beneficiary !== ex.paid_for_by)
  
  return splits.flatMap(s => {
    return createDebtWithKey({
      debtor: s.beneficiary,
      creditor: ex.paid_for_by,
      amount: s.amount,
      expenseId: ex.id
    })
  })
}

/**
 * Matches up debts between the same creditor and debtor so that
 * there's only ever one debt between a pair of people
 * 
 * @param debts 
 * @returns Debt[]
 */
export const rationaliseDebts = (debts: Debt[]): Debt[] => {
  let rationalisedDebts = debts.reduce((acc, _d) => {
    const debt = {..._d}
    const existingDebt = acc.find(d => d.debtor === debt.debtor && d.creditor === debt.creditor)
    if(existingDebt) {
      existingDebt.amount += debt.amount
    } else {
      acc.push(debt)
    }
    return acc
  }, [] as Debt[])

  rationalisedDebts = rationalisedDebts.reduce((acc, debt) => {
    const existingDebt = acc.find(d => d.debtor === debt.creditor && d.creditor === debt.debtor)
    if(existingDebt) {
      const creditAmount = debt.amount
      if(existingDebt.amount > creditAmount) {
        // apply credit
        existingDebt.amount -= creditAmount
      } else {
        // flip creditor and debtor
        existingDebt.amount = creditAmount - existingDebt.amount
        existingDebt.debtor = debt.debtor
        existingDebt.creditor = debt.creditor
      }
    } else {
      acc.push({...debt})
    }
    return acc
  }, [] as typeof debts)

  rationalisedDebts = rationalisedDebts.filter(d => d.amount > 0)

  return rationalisedDebts
}

/**
 * Reduces a list of debts to the fewest possible payments.
 * Eg. if A owes B £5 and B owes C £5, then A can pay C directly
 * 
 * @param debts
 * @returns Debt[]
 */
export const simplyfyDebts = (debts: Debt[]): Debt[] => {
  if(debts.length === 0) {
    return []
  }

  const d = [...debts]

  const sorted = d.sort((a, b) => b.amount - a.amount)
  const simplifiedDebts = [...sorted]
  let counter = 0;

  sorted.forEach(debtA => {
    const debtorDebts = d.filter(d => d.creditor === debtA.debtor)
    if(debtorDebts.length === 0) {
      return;
    }

    debtorDebts.forEach(debtB => {
      if(debtA.amount >= debtB.amount) {
        const correctionAmount = debtB.amount

        // add correction to reduce amount owed in debtA
        simplifiedDebts.push(createDebtWithKey({
          amount: correctionAmount,
          debtor: debtA.creditor,
          creditor: debtA.debtor,
          expenseId: `CORRECTION#${++counter}`
        }));

        // add correction to cancel out debtB
        simplifiedDebts.push(createDebtWithKey({
          amount: correctionAmount,
          debtor: debtB.creditor,
          creditor: debtB.debtor,
          expenseId: `CORRECTION#${++counter}`
        }));

        // add debt to reassign debtB to debtA creditor
        simplifiedDebts.push(createDebtWithKey({
          amount: correctionAmount,
          debtor: debtB.debtor,
          creditor: debtA.creditor,
          expenseId: `CORRECTION#${++counter}`
        }));

      }
    })
  })

  return simplifiedDebts
}