import { User } from '~/domain/model'
import { AuthRepository } from '~/domain/repository'
import type {
  AuthStateCallback,
  LoginDTO,
  RegisterDTO,
  Unsubscribe,
} from '~/domain/repository/auth-repository'

import AuthDataSource from './auth-datasource'

export default class CoreAuthRepository implements AuthRepository {
  public constructor(private remoteDataSource: AuthDataSource) {}

  async login(loginDTO: LoginDTO): Promise<User> {
    return await this.remoteDataSource.login(loginDTO)
  }

  async signUp(registerDTO: RegisterDTO): Promise<User> {
    return await this.remoteDataSource.signUp(registerDTO)
  }

  async logout(): Promise<void> {
    return await this.remoteDataSource.logout()
  }

  subscribeToAuthState(callback: AuthStateCallback): Unsubscribe {
    return this.remoteDataSource.subscribeToAuthState(callback)
  }
}
