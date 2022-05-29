import {
  doc,
  onSnapshot,
  Timestamp,
  updateDoc,
  getDocs,
  collection,
  addDoc,
} from 'firebase/firestore'

import { UnknownError } from '~/common/error'
import { RoomDataSource } from '~/data/room'
import { Room } from '~/domain/model'
import {
  CreateRoomDTO,
  GetRoomListDTO,
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
    const { groupID, roomTitle } = dto
    const currentTimestamp = Timestamp.now()

    try {
      await addDoc(collection(this.firebase.db, 'group', groupID, 'room'), {
        content: '',
        title: roomTitle,
        createdAt: currentTimestamp,
        updatedAt: currentTimestamp,
      })
    } catch (error) {
      throw new UnknownError(error)
    }
  }
}
