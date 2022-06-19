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

export type AuthState =
  | {
      user: User
      isLoggedIn: true
    }
  | {
      user?: User
      isLoggedIn: false
    }
export type AuthStateCallback = (authState: AuthState) => void
export type Unsubscribe = () => void

export type ChangePasswordDTO = {
  oldPassword: string
  newPassword: string
}

export default interface AuthRepository {
  login: (loginDTO: LoginDTO) => Promise<User>
  signUp: (registerDTO: RegisterDTO) => Promise<User>
  logout: () => Promise<void>
  subscribeToAuthState: (callback: AuthStateCallback) => Unsubscribe
  changePassword: (dto: ChangePasswordDTO) => Promise<void>
  changeName: (newName: string) => Promise<void>
}
