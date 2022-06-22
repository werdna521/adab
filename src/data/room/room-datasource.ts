import { Timestamp } from 'firebase/firestore'

import { Group, Room } from '~/domain/model'
import {
  CreateRoomDTO,
  EditTranscriptDTO,
  EndMeetingDTO,
  GetRoomListDTO,
  GetScheduledRoomListDTO,
  PublishNewContentDTO,
  RoomStateCallback,
  Unsubscribe,
} from '~/domain/repository/room-repository'

export default interface RoomDataSource {
  subscribeToRoomState: (
    groupID: string,
    roomID: string,
    callback: RoomStateCallback,
  ) => Unsubscribe
  publishNewContent: (dto: PublishNewContentDTO) => Promise<void>
  getRoomList: (dto: GetRoomListDTO) => Promise<Room[]>
  createRoom: (dto: CreateRoomDTO) => Promise<void>
  endMeeting: (dto: EndMeetingDTO) => Promise<void>
  editTranscript: (dto: EditTranscriptDTO) => Promise<void>
  getScheduledRoomList: (dto: GetScheduledRoomListDTO) => Promise<
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
}
