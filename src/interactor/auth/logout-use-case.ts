import { AuthRepository } from '~/domain/repository'

import Result from '../result'
import UseCase from '../use-case'

export default class LogOutUseCase implements UseCase<any, null> {
  constructor(private authRepository: AuthRepository) {}

  async invoke(_: any = null): Promise<Result<null>> {
    try {
      await this.authRepository.logout()
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
