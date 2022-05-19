import { RoomRepository } from '~/domain/repository'
import {
  RoomStateCallback,
  Unsubscribe,
} from '~/domain/repository/room-repository'

import SubscriptionUseCase from '../subscription-use-case'

type DTO = {
  roomID: string
  groupID: string
  callback: RoomStateCallback
}
export default class SubscribeToRoomUseCase
  implements SubscriptionUseCase<DTO, Unsubscribe>
{
  constructor(private roomRepository: RoomRepository) {}

  invoke({ roomID, groupID, callback }: DTO): Unsubscribe {
    return this.roomRepository.subscribeToRoom(groupID, roomID, callback)
  }
}
