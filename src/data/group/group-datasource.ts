import { Group, User } from '~/domain/model'
import {
  CreateGroupDTO,
  JoinGroupDTO,
  RemoveMemberDTO,
  UpdateMemberRoleDTO,
} from '~/domain/repository/group-repository'

export default interface GroupDataSource {
  getGroupList: (user: User) => Promise<Group[]>
  createGroup: (dto: CreateGroupDTO) => Promise<void>
  updateMemberRole: (dto: UpdateMemberRoleDTO) => Promise<void>
  removeMember: (dto: RemoveMemberDTO) => Promise<void>
  joinGroup: (dto: JoinGroupDTO) => Promise<void>
  getGroupDetails: (groupID: string) => Promise<Group>
}
