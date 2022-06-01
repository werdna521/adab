import { Group } from '~/domain/model'
import { GroupRepository } from '~/domain/repository'

import Result from '../result'
import UseCase from '../use-case'

export default class GetGroupDetailsUseCase implements UseCase<string, Group> {
  constructor(private groupRepository: GroupRepository) {}

  async invoke(groupID: string): Promise<Result<Group>> {
    try {
      const room = await this.groupRepository.getGroupDetails(groupID)
      return {
        data: room,
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
