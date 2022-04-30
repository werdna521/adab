import { User } from '../model'

export type RegisterDTO = {
  displayName: string
  email: string
  password: string
}

export default interface AuthRepository {
  signUp: (registerDTO: RegisterDTO) => Promise<User>
}
