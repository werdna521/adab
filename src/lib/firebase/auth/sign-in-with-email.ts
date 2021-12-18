import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../init'

type Params = {
  email: string
  password: string
}

export const signInWithEmail = async (params: Params) => {
  const { email, password } = params

  const handleSuccess = async () => {}
  const handleError = () => alert('Cannot login')

  return signInWithEmailAndPassword(auth(), email, password)
    .then(handleSuccess)
    .catch(handleError)
}
