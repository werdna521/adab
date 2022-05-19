import { doc, onSnapshot } from 'firebase/firestore'

import { RoomDataSource } from '~/data/room'
import { Room } from '~/domain/model'
import {
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
}
