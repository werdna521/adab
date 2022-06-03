import { RoomRepository } from '~/domain/repository'
import { EditTranscriptDTO } from '~/domain/repository/room-repository'

import Result from '../result'
import UseCase from '../use-case'

export default class EditTranscriptUseCase
  implements UseCase<EditTranscriptDTO, null>
{
  constructor(private roomRepository: RoomRepository) {}

  async invoke(dto: EditTranscriptDTO): Promise<Result<null>> {
    try {
      await this.roomRepository.editTranscript(dto)
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
