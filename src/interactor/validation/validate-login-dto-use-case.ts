import * as z from 'zod'

import { UnknownError } from '~/common/error'
import { ValidationError } from '~/domain/error'
import { LoginDTO } from '~/domain/repository/auth-repository'

import Result from '../result'
import UseCase from '../use-case'
import { parseValidationError } from './utils'

export default class ValidateLoginDTOUseCase
  implements UseCase<LoginDTO, null>
{
  private schema = z.object({
    email: z.string().email('Email is not valid.'),
    password: z.string().nonempty('Password is required.'),
  })

  async invoke(loginDTO: LoginDTO): Promise<Result<null>> {
    try {
      this.schema.parse(loginDTO)
      return {
        data: null,
        error: null,
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          data: null,
          error: new ValidationError(parseValidationError(error)),
        }
      }
      return {
        data: null,
        error: new UnknownError(error),
      }
    }
  }
}
