import { User } from '~/domain/model'
import type {
  AuthStateCallback,
  LoginDTO,
  RegisterDTO,
  Unsubscribe,
} from '~/domain/repository/auth-repository'

export default interface AuthDataSource {
  login: (loginDTO: LoginDTO) => Promise<User>
  signUp: (registerDTO: RegisterDTO) => Promise<User>
  subscribeToAuthState: (callback: AuthStateCallback) => Unsubscribe
}
