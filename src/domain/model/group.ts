export type UserUID = string
type Group = {
  uid: string
  name: string
  members: Record<UserUID, true>
}

export default Group
