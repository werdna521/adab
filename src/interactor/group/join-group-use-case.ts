import { AlreadyInGroupError } from '~/domain/error'
import { Group, User } from '~/domain/model'
import { GroupRepository } from '~/domain/repository'

import Result from '../result'
import UseCase from '../use-case'

type DTO = {
  group: Group
  user: User
}

export default class JoinGroupUseCase implements UseCase<DTO, null> {
  constructor(private groupRepository: GroupRepository) {}

  async invoke(dto: DTO): Promise<Result<null>> {
    const { user, group } = dto

    try {
      const isUserInGroup = !!group.members[user.uid]
      if (isUserInGroup) {
        throw new AlreadyInGroupError()
      }

      await this.groupRepository.joinGroup({
        user,
        groupID: group.uid,
      })
      return {
        data: null,
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
