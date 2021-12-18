import { serverTimestamp, updateDoc, doc } from 'firebase/firestore'
import { COLLECTIONS } from '../../../constants/collections'
import { User } from '../../auth/auth-context'
import { db } from '../init'

type Params = {
  roomId: string
  user: User
}

type Returns = {
  error: unknown
}

export const joinRoom = async (params: Params): Promise<Returns> => {
  const { user, roomId } = params
  const { uid = '', displayName, email } = user
  const currentTimestamp = serverTimestamp()

  try {
    await updateDoc(doc(db(), COLLECTIONS.ROOM, roomId), {
      [`participants.${uid}`]: {
        uid,
        email,
        name: displayName,
      },
      updatedAt: currentTimestamp,
    })

    return { error: null }
  } catch (error) {
    console.log({ error })
    return { error }
  }
}
