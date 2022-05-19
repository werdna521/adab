import {
  RoomStateCallback,
  Unsubscribe,
} from '~/domain/repository/room-repository'

export default interface RoomDataSource {
  subscribeToRoomState: (
    groupID: string,
    roomID: string,
    callback: RoomStateCallback,
  ) => Unsubscribe
}
