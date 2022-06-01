import { GroupRepository } from '~/domain/repository'
import { JoinGroupDTO } from '~/domain/repository/group-repository'

import Result from '../result'
import UseCase from '../use-case'

export default class JoinGroupUseCase implements UseCase<JoinGroupDTO, null> {
  constructor(private groupRepository: GroupRepository) {}

  async invoke(dto: JoinGroupDTO): Promise<Result<null>> {
    try {
      await this.groupRepository.joinGroup(dto)
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
