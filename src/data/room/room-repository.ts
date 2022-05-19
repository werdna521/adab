import { RoomRepository } from '~/domain/repository'
import {
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
}
