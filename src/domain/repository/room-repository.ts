import { Room } from '../model'

export type RoomStateCallback = (room: Room) => void
export type Unsubscribe = () => void

export default interface RoomRepository {
  subscribeToRoom: (
    groupID: string,
    roomID: string,
    callback: RoomStateCallback,
  ) => Unsubscribe
}
