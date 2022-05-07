import { User } from '~/domain/model'
import { AuthRepository } from '~/domain/repository'
import { LoginDTO } from '~/domain/repository/auth-repository'

import Result from '../result'
import UseCase from '../use-case'

export default class LoginUseCase implements UseCase<LoginDTO, User> {
  constructor(private authRepository: AuthRepository) {}

  async invoke(loginDTO: LoginDTO): Promise<Result<User>> {
    try {
      const user = await this.authRepository.login(loginDTO)
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
