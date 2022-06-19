import { User } from '~/domain/model'
import type {
  AuthStateCallback,
  ChangePasswordDTO,
  LoginDTO,
  RegisterDTO,
  Unsubscribe,
} from '~/domain/repository/auth-repository'

export default interface AuthDataSource {
  login: (loginDTO: LoginDTO) => Promise<User>
  signUp: (registerDTO: RegisterDTO) => Promise<User>
  logout: () => Promise<void>
  subscribeToAuthState: (callback: AuthStateCallback) => Unsubscribe
  changePassword: (dto: ChangePasswordDTO) => Promise<void>
}
