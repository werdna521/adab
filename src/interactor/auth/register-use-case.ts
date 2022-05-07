import { User } from '~/domain/model'
import { AuthRepository } from '~/domain/repository'
import { RegisterDTO } from '~/domain/repository/auth-repository'
import UseCase from '~/interactor/use-case'

import Result from '../result'

export default class RegisterUseCase implements UseCase<RegisterDTO, User> {
  private authRepository: AuthRepository

  public constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository
  }

  async invoke(registerDTO: RegisterDTO): Promise<Result<User>> {
    try {
      const user = await this.authRepository.signUp(registerDTO)
      return {
        data: user,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error: error as Error,
      }
    }
  }
}
