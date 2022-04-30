import { User } from '~/domain/model'
import { AuthRepository } from '~/domain/repository'
import { RegisterDTO } from '~/domain/repository/auth-repository'
import UseCase from '~/interactor/use-case'

export default class RegisterUseCase implements UseCase<RegisterDTO, User> {
  private authRepository: AuthRepository

  public constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository
  }

  async invoke(registerDTO: RegisterDTO): Promise<User> {
    return await this.authRepository.signUp(registerDTO)
  }
}
