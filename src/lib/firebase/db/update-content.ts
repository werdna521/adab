import { doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { COLLECTIONS } from '../../../constants'
import { db } from '../init'

type Params = {
  roomId: string
  content: string
}

type Returns = {
  error: unknown
}

export const updateContent = async (params: Params): Promise<Returns> => {
  const { roomId, content } = params
  const currentTimestamp = serverTimestamp()

  try {
    await updateDoc(doc(db(), COLLECTIONS.ROOM, roomId), {
      content,
      updatedAt: currentTimestamp,
    })

    return { error: null }
  } catch (error) {
    return { error }
  }
}
