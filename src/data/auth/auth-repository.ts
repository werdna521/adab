import { User } from '~/domain/model'
import { AuthRepository } from '~/domain/repository'
import type { LoginDTO, RegisterDTO } from '~/domain/repository/auth-repository'

import AuthDataSource from './auth-datasource'

export default class CoreAuthRepository implements AuthRepository {
  public constructor(private remoteDataSource: AuthDataSource) {}

  async login(loginDTO: LoginDTO): Promise<User> {
    return await this.remoteDataSource.login(loginDTO)
  }

  async signUp(registerDTO: RegisterDTO): Promise<User> {
    return await this.remoteDataSource.signUp(registerDTO)
  }
}
