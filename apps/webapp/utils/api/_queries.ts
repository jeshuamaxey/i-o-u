export const GROUP_SELECT = `
  *,
  group_members(
    *,
    profiles(*)
  ),
  expenses(*),
  payments(*)
`
