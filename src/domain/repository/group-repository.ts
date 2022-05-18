import { User } from '../model'

export type CreateGroupDTO = {
  groupName: string
  user: User
}

export default interface GroupRepository {
  createGroup: (dto: CreateGroupDTO) => Promise<void>
}
