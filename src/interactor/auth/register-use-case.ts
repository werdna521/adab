import { User } from '~/domain/model'
import { AuthRepository } from '~/domain/repository'
import { RegisterDTO } from '~/domain/repository/auth-repository'
import UseCase from '~/interactor/use-case'

import Result from '../result'

export default class RegisterUseCase implements UseCase<RegisterDTO, User> {
  public constructor(private authRepository: AuthRepository) {}

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
