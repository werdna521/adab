import { AuthDataSource } from '../../../data/auth'
import { User } from '../../../domain/model'
import { RegisterDTO } from '../../../domain/repository/auth-repository'
import AuthService from './service/auth-service'

export default class RemoteAuthDataSource implements AuthDataSource {
  private authService: AuthService

  public constructor(authService: AuthService) {
    this.authService = authService
  }

  async signUp(registerDTO: RegisterDTO): Promise<User> {
    return await this.authService.signUp(registerDTO)
  }
}
