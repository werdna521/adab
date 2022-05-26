export enum Role {
  ADMIN = 'admin',
  MEMBER = 'member',
}
export type UserUID = string
export type Member = {
  name: string
  role: Role
}
type Group = {
  uid: string
  name: string
  members: Record<UserUID, Member>
}

export default Group
