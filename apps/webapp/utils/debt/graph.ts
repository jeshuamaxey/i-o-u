import { Debt } from "@/types"
import { Graph } from "@dagrejs/graphlib"
import { Database } from "@repo/supabase-types"
import { SBGroup } from "../api/_types"

type EdgeWithData = {
  v: string
  w: string
  amount: number
  expenseId: string[]
}


/**
 * Constructs a graph where each node is a member of the group and each
 * edge represents the cumulative debt between 2 group members.
 * 
 * Anatomy of an edge:
 * 
 * arrow points in the direction of money owed, so if A owes B £5
 * A --> B { amount: 5}
 * 
 * as the amount is accumulated, it could end up negative.
 * eg. if ultimately B owes A £20 then you'll get
 * 
 * A --> B { amount: -20 }
 * 
 * TODO: consider rationalising this at the end so all amounts are positive
 * 
 * @param debts 
 * @returns graph of debts
 */
export const createDebtGraph = (debts: Debt[]) => {
  const debug = false
  const graph = new Graph()

  debts.forEach(({debtor, creditor, amount, expenseId}) => {
    const creditorLabel = debug ? creditor.slice(-4) : creditor
    const debtorLabel = debug ? debtor.slice(-4): debtor

    debug ?? console.log(`${debtorLabel} owes ${creditorLabel} ${amount}`)

    if(!graph.hasNode(creditorLabel)) {
      debug ?? console.log(`    ${creditorLabel} added to the graph`)
      graph.node(creditorLabel)
    }
    if(!graph.hasNode(debtor)) {
      debug ?? console.log(`    ${debtorLabel} added to the graph`)
      graph.node(debtorLabel)
    }

    const edge = graph.edge(debtorLabel, creditorLabel)
    const reverseEdge = graph.edge(creditorLabel, debtorLabel)

    if(edge) {
      debug ?? console.log(`    ${debtorLabel} -> ${creditorLabel} edge found. Updating...`)
      graph.setEdge(debtorLabel, creditorLabel, {
        amount: edge.amount + amount,
        expenseIds: [...edge.expenseIds, expenseId]
      })
      
    } else if(reverseEdge) {
      debug ?? console.log(`    ${creditorLabel} -> ${debtorLabel} reverse edge found. Updating...`)
      graph.setEdge(creditorLabel, debtorLabel, {
        amount: reverseEdge.amount - amount,
        expenseIds: [...reverseEdge.expenseIds, expenseId]
      })

    } else {
      debug ?? console.log(`    ${debtorLabel} -> ${creditorLabel} edge not found. Creating...`)
      graph.setEdge(debtorLabel, creditorLabel, { amount, expenseIds: [expenseId] })
    }
  })

  return graph
}

type UserBalance = {
  groupMemberId: string
  amount: number
}

/**
 * Returns 2 lists of users, one for those who owe money and one for those who are owed money.
 * Both lists are sorted largest to smallest amount.
 * 
 * @param graph 
 * @returns { debtList: UserBalance[], creditList: UserBalance[] }
 */
const createDebtAndCreditLists = (graph: Graph): { debtList: UserBalance[], creditList: UserBalance[] } => {
  const users = graph.nodes().map(nodeLabel => {
    const inEdges: EdgeWithData[] = (graph.inEdges(nodeLabel) || []).map(({v,w}) => {
      return {v, w, ...graph.edge(v, w)}
    })
    const outEdges: EdgeWithData[] = (graph.outEdges(nodeLabel) || []).map(({v,w}) => {
      return {v, w, ...graph.edge(v, w)}
    })

    let amount = outEdges.reduce((acc, edge) => {
      return acc + edge.amount
    }, 0)

    amount += inEdges.reduce((acc, edge) => {
      return acc - edge.amount
    }, 0)

    return { groupMemberId: nodeLabel, amount }
  })

  const debtList = users.filter(u => u.amount > 0).map(u => {
    return {...u, type: "debt"}
  }).sort((a, b) => b.amount - a.amount)

  const creditList = users.filter(u => u.amount < 0).map(u => {
    return {...u, amount: -u.amount, type: "credit"}
  }).sort((a, b) => b.amount - a.amount)

  const totalCredit = creditList.reduce((acc, u) => acc + u.amount, 0)
  const totalDebt = debtList.reduce((acc, u) => acc + u.amount, 0)

  if(totalCredit - totalDebt !== 0) {
    console.error("Total credit and total debt do not match")
    throw new Error("DebtCreditDoNotSumToZero")
  }

  return {
    debtList, creditList
  }
}

type SettleUpPayment = Omit<Database["public"]["Tables"]["payments"]["Insert"], "created_by" | "date">

export const createListOfSettleUpPayments = (graph: Graph, group: SBGroup): SettleUpPayment[] => {
  const { debtList, creditList } = createDebtAndCreditLists(graph);
  const settleUpPayments: SettleUpPayment[] = []
  let creditIndex = 0

  debtList.forEach(debt => {
    const credit = creditList[creditIndex]

    if(!credit) {
      console.error(`Credit list exhausted at index = ${creditIndex}`)
      throw new Error("CreditListExhausted")
    }

    if(debt.amount <= credit.amount) {
      settleUpPayments.push({
        paid_from: debt.groupMemberId,
        paid_to: credit.groupMemberId,
        amount: debt.amount,
        group_id: group.id
      })

      credit.amount -= debt.amount
      debt.amount = 0

      if(credit.amount === 0) {
        creditIndex++
      }
    }

    if(debt.amount > credit.amount) {
      settleUpPayments.push({
        paid_from: debt.groupMemberId,
        paid_to: credit.groupMemberId,
        amount: credit.amount,
        group_id: group.id
      })

      debt.amount -= credit.amount
      credit.amount = 0
      creditIndex++
    }
  })

  return settleUpPayments
}