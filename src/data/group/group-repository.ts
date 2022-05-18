import { Group, User } from '~/domain/model'
import { GroupRepository } from '~/domain/repository'
import { CreateGroupDTO } from '~/domain/repository/group-repository'

import GroupDataSource from './group-datasource'

export default class CoreGroupRepository implements GroupRepository {
  constructor(private remoteDataSource: GroupDataSource) {}

  async getGroupList(user: User): Promise<Group[]> {
    return await this.remoteDataSource.getGroupList(user)
  }

  async createGroup(dto: CreateGroupDTO): Promise<void> {
    return await this.remoteDataSource.createGroup(dto)
  }
}
