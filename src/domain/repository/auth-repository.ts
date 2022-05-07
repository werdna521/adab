import { User } from '~/domain/model'

export type RegisterDTO = {
  displayName: string
  email: string
  password: string
}

export type LoginDTO = {
  email: string
  password: string
}

export default interface AuthRepository {
  login: (loginDTO: LoginDTO) => Promise<User>
  signUp: (registerDTO: RegisterDTO) => Promise<User>
}
