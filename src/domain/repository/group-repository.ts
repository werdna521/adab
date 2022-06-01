import { Group, User } from '../model'
import { Role } from '../model/group'

export type CreateGroupDTO = {
  groupName: string
  user: User
}

export type UpdateMemberRoleDTO = {
  groupID: string
  memberID: string
  role: Role
}

export default interface GroupRepository {
  getGroupList: (user: User) => Promise<Group[]>
  createGroup: (dto: CreateGroupDTO) => Promise<void>
  updateMemberRole: (dto: UpdateMemberRoleDTO) => Promise<void>
}
