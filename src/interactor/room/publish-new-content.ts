import { RoomRepository } from '~/domain/repository'
import { PublishNewContentDTO } from '~/domain/repository/room-repository'

import Result from '../result'
import UseCase from '../use-case'

export default class PublishNewContentUseCase
  implements UseCase<PublishNewContentDTO, null>
{
  constructor(private roomRepository: RoomRepository) {}

  async invoke(dto: PublishNewContentDTO): Promise<Result<any>> {
    try {
      await this.roomRepository.publishNewContent(dto)
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
