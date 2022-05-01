import * as z from 'zod'

import { UnknownError } from '~/common/error'
import { ValidationError } from '~/domain/error'
import { RegisterDTO } from '~/domain/repository/auth-repository'
import UseCase from '~/interactor/use-case'

import Result from '../result'
import { parseValidationError } from '../utils'

export default class ValidateRegisterDTOUseCase
  implements UseCase<RegisterDTO, null>
{
  private schema = z.object({
    displayName: z
      .string()
      .min(1, 'Name should be at least 1 character.')
      .max(255, 'Name should be at most 255 characters.'),
    email: z.string().email('Email is not valid.'),
    password: z
      .string()
      .min(6, 'Password should be at least 6 characters.')
      .max(255, 'Password should be at most 255 characters.'),
  })

  async invoke(registerDTO: RegisterDTO): Promise<Result<null>> {
    try {
      this.schema.parse(registerDTO)
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
