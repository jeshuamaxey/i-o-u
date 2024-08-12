import { SBGroup } from "./api/_types"

export const getGroupMemberDisplayName = (group: SBGroup, userId: string) => {
  const gm = group.group_members.find(m => m.user_id === userId)
  return gm?.profiles?.username || gm?.name || "Unknown"
}