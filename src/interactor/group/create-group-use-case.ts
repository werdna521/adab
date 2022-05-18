import { GroupRepository } from '~/domain/repository'
import { CreateGroupDTO } from '~/domain/repository/group-repository'

import Result from '../result'
import UseCase from '../use-case'

export default class CreateGroupUseCase
  implements UseCase<CreateGroupDTO, null>
{
  constructor(private groupRepository: GroupRepository) {}

  async invoke(dto: CreateGroupDTO): Promise<Result<null>> {
    try {
      await this.groupRepository.createGroup(dto)
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
