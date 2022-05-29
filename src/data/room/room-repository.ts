import { Room } from '~/domain/model'
import { RoomRepository } from '~/domain/repository'
import {
  CreateRoomDTO,
  GetRoomListDTO,
  PublishNewContentDTO,
  RoomStateCallback,
  Unsubscribe,
} from '~/domain/repository/room-repository'

import RoomDataSource from './room-datasource'

export default class CoreGroupRepository implements RoomRepository {
  constructor(private remoteDataSource: RoomDataSource) {}

  subscribeToRoom(
    groupID: string,
    roomID: string,
    callback: RoomStateCallback,
  ): Unsubscribe {
    return this.remoteDataSource.subscribeToRoomState(groupID, roomID, callback)
  }

  async publishNewContent(dto: PublishNewContentDTO): Promise<void> {
    return this.remoteDataSource.publishNewContent(dto)
  }

  async getRoomList(dto: GetRoomListDTO): Promise<Room[]> {
    return this.remoteDataSource.getRoomList(dto)
  }

  async createRoom(dto: CreateRoomDTO): Promise<void> {
    return this.remoteDataSource.createRoom(dto)
  }
}
