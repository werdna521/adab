import { doc, onSnapshot, Unsubscribe } from 'firebase/firestore'
import { COLLECTIONS } from '../../../constants'
import { db } from '../init'

type Params = {
  roomId: string
  onStream: (text: string) => void
}

export const streamContent = (params: Params): Unsubscribe => {
  const { roomId, onStream } = params

  const unSubscribe = onSnapshot(doc(db(), COLLECTIONS.ROOM, roomId), (doc) => {
    const content = doc?.data()?.content
    onStream(content)
  })

  return unSubscribe
}
