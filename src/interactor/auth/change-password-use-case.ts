import { AuthRepository } from '~/domain/repository'
import { ChangePasswordDTO } from '~/domain/repository/auth-repository'

import Result from '../result'
import UseCase from '../use-case'

export default class ChangePasswordUseCase
  implements UseCase<ChangePasswordDTO, null>
{
  constructor(private authRepository: AuthRepository) {}

  async invoke(dto: ChangePasswordDTO): Promise<Result<null>> {
    try {
      await this.authRepository.changePassword(dto)

      return {
        data: null,
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
