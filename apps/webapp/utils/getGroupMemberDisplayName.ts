import { SBGroup } from "./api/_types"

export const getGroupMemberDisplayNameFromUserId = (group: SBGroup, userId: string) => {
  const gm = group.group_members.find(m => m.user_id === userId)
  return gm?.profiles?.username || gm?.name || "Unknown"
}

export const getGroupMemberDisplayNameFromMembershipId = (group: SBGroup, gmId: string) => {
  const gm = group.group_members.find(m => m.id === gmId)
  return gm?.profiles?.username || gm?.name || "Unknown"
}