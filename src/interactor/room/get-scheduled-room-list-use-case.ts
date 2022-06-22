import { Timestamp } from 'firebase/firestore'

import { Group, Room } from '~/domain/model'
import { RoomRepository } from '~/domain/repository'

import Result from '../result'
import UseCase from '../use-case'

type DTO = {
  userID: string
}

export default class GetScheduledRoomUseCase
  implements
    UseCase<
      DTO,
      Record<
        string,
        {
          timestamp: Timestamp
          data: {
            room: Room
            group: Group
          }[]
        }
      >
    >
{
  constructor(private roomRepository: RoomRepository) {}

  async invoke(dto: DTO): Promise<
    Result<
      Record<
        string,
        {
          timestamp: Timestamp
          data: {
            room: Room
            group: Group
          }[]
        }
      >
    >
  > {
    try {
      const startDate = new Date()
      startDate.setMonth(startDate.getMonth() - 1)
      const endDate = new Date()
      endDate.setMonth(endDate.getMonth() + 1)

      const roomList = await this.roomRepository.getScheduledRoomList({
        startDate: Timestamp.fromDate(startDate),
        endDate: Timestamp.fromDate(endDate),
        ...dto,
      })
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
