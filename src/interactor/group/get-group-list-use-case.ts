import { Group, User } from '~/domain/model'
import { GroupRepository } from '~/domain/repository'

import Result from '../result'
import UseCase from '../use-case'

export default class GetGroupListUseCase implements UseCase<User, Group[]> {
  constructor(private groupRepository: GroupRepository) {}

  async invoke(user: User): Promise<Result<Group[]>> {
    try {
      const groupList = await this.groupRepository.getGroupList(user)
      return {
        data: groupList,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error: error as Error,
      }
    }
  }
}
