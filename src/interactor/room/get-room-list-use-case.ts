import { Room } from '~/domain/model'
import { RoomRepository } from '~/domain/repository'
import { GetRoomListDTO } from '~/domain/repository/room-repository'

import Result from '../result'
import UseCase from '../use-case'

export default class GetRoomListUseCase
  implements UseCase<GetRoomListDTO, Room[]>
{
  constructor(private roomRepository: RoomRepository) {}

  async invoke(dto: GetRoomListDTO): Promise<Result<Room[]>> {
    try {
      const roomList = await this.roomRepository.getRoomList(dto)
      return {
        data: roomList,
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
