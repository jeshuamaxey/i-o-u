export const GROUP_SELECT = `
  *,
  group_members(
    *,
    profiles(*)
  ),
  expenses(
    *,
    paid_for_by_profile:profiles(*)
  )
`
