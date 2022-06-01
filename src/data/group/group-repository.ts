import { Group, User } from '~/domain/model'
import { GroupRepository } from '~/domain/repository'
import {
  CreateGroupDTO,
  JoinGroupDTO,
  RemoveMemberDTO,
  UpdateMemberRoleDTO,
} from '~/domain/repository/group-repository'

import GroupDataSource from './group-datasource'

export default class CoreGroupRepository implements GroupRepository {
  constructor(private remoteDataSource: GroupDataSource) {}

  async getGroupList(user: User): Promise<Group[]> {
    return await this.remoteDataSource.getGroupList(user)
  }

  async createGroup(dto: CreateGroupDTO): Promise<void> {
    return await this.remoteDataSource.createGroup(dto)
  }

  async updateMemberRole(dto: UpdateMemberRoleDTO): Promise<void> {
    return await this.remoteDataSource.updateMemberRole(dto)
  }

  async removeMember(dto: RemoveMemberDTO): Promise<void> {
    return await this.remoteDataSource.removeMember(dto)
  }

  async joinGroup(dto: JoinGroupDTO): Promise<void> {
    return await this.remoteDataSource.joinGroup(dto)
  }

  async getGroupDetails(groupID: string): Promise<Group> {
    return await this.remoteDataSource.getGroupDetails(groupID)
  }
}
