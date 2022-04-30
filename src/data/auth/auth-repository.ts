import { User } from '~/domain/model'
import { AuthRepository } from '~/domain/repository'
import type { RegisterDTO } from '~/domain/repository/auth-repository'
import AuthDataSource from './auth-datasource'

export default class CoreAuthRepository implements AuthRepository {
  private remoteAuthDataStore: AuthDataSource

  public constructor(remoteAuthDataStore: AuthDataSource) {
    this.remoteAuthDataStore = remoteAuthDataStore
  }

  async signUp(registerDTO: RegisterDTO): Promise<User> {
    return await this.remoteAuthDataStore.signUp(registerDTO)
  }
}
