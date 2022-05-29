import { RoomRepository } from '~/domain/repository'
import { CreateRoomDTO } from '~/domain/repository/room-repository'

import Result from '../result'
import UseCase from '../use-case'

export default class CreateRoomUseCase implements UseCase<CreateRoomDTO, null> {
  constructor(private roomRepository: RoomRepository) {}

  async invoke(dto: CreateRoomDTO): Promise<Result<null>> {
    try {
      await this.roomRepository.createRoom(dto)
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
