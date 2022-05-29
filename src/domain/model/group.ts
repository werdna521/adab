export enum Role {
  OWNER = 'owner',
  ADMIN = 'admin',
  MEMBER = 'member',
}
export type UserUID = string
export type Member = {
  name: string
  role: Role
}
export type AccessProperties = {
  isSelf: boolean
  canEditRole: boolean
  canRemoveMember: boolean
}
export type MemberWithAccessProperties = Member & AccessProperties

type Group = {
  uid: string
  name: string
  members: Record<UserUID, Member>
}

export default Group
