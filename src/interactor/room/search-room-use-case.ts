import { UnknownError } from '~/common/error'
import { Room } from '~/domain/model'

import Result from '../result'
import UseCase from '../use-case'

type RoomSectionList = {
  title: string
  data: Room[]
}[]

type DTO = {
  roomList: RoomSectionList
  query: string
}

export default class SearchRoomUseCase
  implements UseCase<DTO, RoomSectionList>
{
  async invoke(dto: DTO): Promise<Result<RoomSectionList>> {
    const { roomList, query } = dto

    try {
      const filteredRoomList = roomList
        .map((section) => ({
          ...section,
          data: section.data.filter((room) =>
            room.title.toLowerCase().includes(query.toLowerCase()),
          ),
        }))
        .filter((section) => section.data.length)
      return {
        data: filteredRoomList,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error: new UnknownError(error),
      }
    }
  }
}
