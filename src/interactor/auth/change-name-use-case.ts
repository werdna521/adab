import { AuthRepository } from '~/domain/repository'

import Result from '../result'
import UseCase from '../use-case'

export default class ChangeNameUseCase implements UseCase<string, null> {
  constructor(private authRepository: AuthRepository) {}

  async invoke(newName: string): Promise<Result<null>> {
    try {
      await this.authRepository.changeName(newName)
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
