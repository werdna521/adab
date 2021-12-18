import { serverTimestamp, addDoc, collection } from 'firebase/firestore'
import { COLLECTIONS } from '../../../constants/collections'
import { User } from '../../auth/auth-context'
import { db } from '../init'

type Params = {
  user: User
  name: string
}

type Returns = {
  id: string
  error: unknown
}

export const createRoom = async (params: Params): Promise<Returns> => {
  const { user, name } = params
  const { uid, displayName, email } = user
  const currentTimestamp = serverTimestamp()

  try {
    const docRef = await addDoc(collection(db(), COLLECTIONS.ROOM), {
      name,
      host: uid,
      content: '',
      participants: [{ uid, email, name: displayName }],
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    })

    return { id: docRef.id, error: null }
  } catch (error) {
    console.log({ error })
    return { id: '', error }
  }
}
