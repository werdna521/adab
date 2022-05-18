import { Group, User } from '../model'

export type CreateGroupDTO = {
  groupName: string
  user: User
}

export default interface GroupRepository {
  getGroupList: (user: User) => Promise<Group[]>
  createGroup: (dto: CreateGroupDTO) => Promise<void>
}
