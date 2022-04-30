import type { User } from '~/domain/model'
import { RegisterDTO } from '~/domain/repository/auth-repository'

export default interface AuthService {
  signUp(registerDTO: RegisterDTO): Promise<User>
}
