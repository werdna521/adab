import { User } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { COLLECTIONS } from '../../../constants'
import { db } from '../init'

type Params = {
  user: User
  displayName: string
}

type Returns = {
  error: unknown
}

export const createUser = async (params: Params): Promise<Returns> => {
  const { user, displayName } = params
  const currentTimestamp = serverTimestamp()
  const { email, uid } = user

  try {
    await setDoc(doc(db(), COLLECTIONS.USER, user.uid), {
      displayName,
      email,
      uid,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    })

    return { error: null }
  } catch (error) {
    console.log({ error })
    return { error }
  }
}
