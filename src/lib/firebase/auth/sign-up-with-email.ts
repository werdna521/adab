import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth'
import { createUser } from '../db/create-user'
import { auth } from '../init'
import { setDisplayName } from './set-display-name'

type Params = {
  displayName: string
  email: string
  password: string
}

export const signUpWithEmail = async (params: Params) => {
  const { displayName, email, password } = params

  const handleSuccess = async (userCredential: UserCredential) => {
    const user = userCredential.user

    const { error: setNameError } = await setDisplayName({ user, displayName })
    if (setNameError) throw setNameError

    const { error: createError } = await createUser({ user, displayName })
    if (createError) throw createError
  }
  const handleError = () => alert('Cannot sign up')

  return createUserWithEmailAndPassword(auth(), email, password)
    .then(handleSuccess)
    .catch(handleError)
}
