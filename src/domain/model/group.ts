export type UserUID = string
export type UserDisplayName = string
type Group = {
  uid: string
  name: string
  members: Record<UserUID, UserDisplayName>
}

export default Group
