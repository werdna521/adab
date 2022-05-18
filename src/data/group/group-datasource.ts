import { Group, User } from '~/domain/model'
import { CreateGroupDTO } from '~/domain/repository/group-repository'

export default interface GroupDataSource {
  getGroupList: (user: User) => Promise<Group[]>
  createGroup: (dto: CreateGroupDTO) => Promise<void>
}
