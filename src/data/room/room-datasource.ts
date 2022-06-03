import { Room } from '~/domain/model'
import {
  CreateRoomDTO,
  EditTranscriptDTO,
  EndMeetingDTO,
  GetRoomListDTO,
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
}
