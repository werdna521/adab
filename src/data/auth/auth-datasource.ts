import { User } from '../../domain/model'
import type { RegisterDTO } from '../../domain/repository/auth-repository'
export default interface AuthDataSource {
  signUp: (registerDTO: RegisterDTO) => Promise<User>
}
