import {
  doc,
  onSnapshot,
  Timestamp,
  updateDoc,
  getDocs,
  collection,
  addDoc,
  where,
  query,
} from 'firebase/firestore'

import { UnknownError } from '~/common/error'
import { RoomDataSource } from '~/data/room'
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
import Firebase from '~/infrastructure/firebase'

export default class FirebaseRoomDataSource implements RoomDataSource {
  constructor(private firebase: Firebase) {}

  subscribeToRoomState(
    groupID: string,
    roomID: string,
    callback: RoomStateCallback,
  ): Unsubscribe {
    return onSnapshot(
      doc(this.firebase.db, 'group', groupID, 'room', roomID),
      (document) => {
        callback(document.data() as Room)
      },
    )
  }

  async publishNewContent(dto: PublishNewContentDTO): Promise<void> {
    const { groupID, roomID, newContent } = dto
    const currentTimestamp = Timestamp.now()

    try {
      return updateDoc(
        doc(this.firebase.db, 'group', groupID, 'room', roomID),
        {
          content: newContent,
          updatedAt: currentTimestamp,
        },
      )
    } catch (error) {
      throw new UnknownError(error)
    }
  }

  async getRoomList(dto: GetRoomListDTO): Promise<Room[]> {
    const { groupID } = dto

    try {
      const snapshot = await getDocs(
        collection(this.firebase.db, 'group', groupID, 'room'),
      )
      return snapshot.docs.map((document) => ({
        uid: document.id,
        ...document.data(),
      })) as Room[]
    } catch (error) {
      throw new UnknownError(error)
    }
  }

  async createRoom(dto: CreateRoomDTO): Promise<void> {
    const { groupID, timestamp, roomTitle } = dto
    const currentTimestamp = Timestamp.now()

    try {
      await addDoc(collection(this.firebase.db, 'group', groupID, 'room'), {
        content: '',
        timestamp,
        title: roomTitle,
        isEnded: false,
        createdAt: currentTimestamp,
        updatedAt: currentTimestamp,
      })
    } catch (error) {
      throw new UnknownError(error)
    }
  }

  async endMeeting(dto: EndMeetingDTO): Promise<void> {
    const { roomID, groupID } = dto
    const currentTimestamp = Timestamp.now()

    try {
      await updateDoc(doc(this.firebase.db, 'group', groupID, 'room', roomID), {
        isEnded: true,
        updatedAt: currentTimestamp,
        endedAt: currentTimestamp,
      })
    } catch (error) {
      throw new UnknownError(error)
    }
  }

  async editTranscript(dto: EditTranscriptDTO): Promise<void> {
    const { roomID, groupID, content } = dto
    const currentTimestamp = Timestamp.now()

    try {
      await updateDoc(doc(this.firebase.db, 'group', groupID, 'room', roomID), {
        content,
        updatedAt: currentTimestamp,
      })
    } catch (error) {
      throw new UnknownError(error)
    }
  }

  async getScheduledRoomList(dto: GetScheduledRoomListDTO): Promise<
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
  > {
    const { userID, startDate, endDate } = dto

    try {
      const snapshot = await getDocs(
        query(
          collection(this.firebase.db, 'group'),
          where(`members.${userID}`, '!=', null),
        ),
      )

      const roomList = await Promise.all(
        snapshot.docs.flatMap(
          async (document) =>
            await this.getRoomWithinTimeRange({
              startDate,
              endDate,
              group: {
                uid: document.id,
                ...document.data(),
              } as Group,
            }),
        ),
      )

      return roomList.flat().reduce(
        (
          acc: Record<
            string,
            {
              timestamp: Timestamp
              data: {
                room: Room
                group: Group
              }[]
            }
          >,
          curr,
        ) => {
          const date = curr.room.timestamp.toDate()
          const key = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
          return {
            ...acc,
            [key]: {
              ...(acc[key] || {}),
              timestamp: curr.room.timestamp,
              data: [...(acc[key]?.data || []), curr],
            },
          }
        },
        {},
      )
    } catch (error) {
      console.log(error)
      throw new UnknownError(error)
    }
  }

  private async getRoomWithinTimeRange({
    startDate,
    endDate,
    group,
  }: {
    startDate: Timestamp
    endDate: Timestamp
    group: Group
  }): Promise<
    {
      room: Room
      group: Group
    }[]
  > {
    const snapshot = await getDocs(
      query(
        collection(this.firebase.db, 'group', group.uid, 'room'),
        where('timestamp', '>=', startDate),
        where('timestamp', '<=', endDate),
      ),
    )

    return snapshot.docs.map((document) => ({
      room: {
        uid: document.id,
        ...document.data(),
      } as Room,
      group,
    })) as {
      room: Room
      group: Group
    }[]
  }
}
