import { Timestamp } from 'firebase/firestore'

import { Group, Room } from '../model'

export type RoomStateCallback = (room: Room) => void
export type Unsubscribe = () => void

export type PublishNewContentDTO = {
  groupID: string
  roomID: string
  newContent: string
}

export type CreateRoomDTO = {
  groupID: string
  timestamp: Date
  roomTitle: string
}

export type GetRoomListDTO = {
  groupID: string
}

export type EndMeetingDTO = {
  groupID: string
  roomID: string
}

export type EditTranscriptDTO = {
  content: string
  groupID: string
  roomID: string
}

export type GetScheduledRoomListDTO = {
  userID: string
  startDate: Timestamp
  endDate: Timestamp
}

export default interface RoomRepository {
  subscribeToRoom: (
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
