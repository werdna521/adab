import { CreateGroupDTO } from '~/domain/repository/group-repository'

export default interface GroupDataSource {
  createGroup: (dto: CreateGroupDTO) => Promise<void>
}
