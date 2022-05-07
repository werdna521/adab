import { User } from '~/domain/model'
import type { LoginDTO, RegisterDTO } from '~/domain/repository/auth-repository'

export default interface AuthDataSource {
  login: (loginDTO: LoginDTO) => Promise<User>
  signUp: (registerDTO: RegisterDTO) => Promise<User>
}
