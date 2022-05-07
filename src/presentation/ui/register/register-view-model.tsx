import { useState } from 'react'

import { UserAlreadyRegisteredError, ValidationError } from '~/domain/error'
import { RegisterDTO } from '~/domain/repository/auth-repository'
import { RegisterUseCase } from '~/interactor/auth'
import { ValidateRegisterDTOUseCase } from '~/interactor/validation'

import { Status, useInput, useStatus } from '../common/hooks'

type Params = {
  registerUseCase: RegisterUseCase
  validateRegisterDTOUseCase: ValidateRegisterDTOUseCase
}
export const useRegisterViewModel = (params: Params) => {
  const { registerUseCase, validateRegisterDTOUseCase } = params

  const [fieldError, setFieldError] = useState<Record<string, string>>({})
  const { setStatus, isError, isInitial, isProcessing, isSuccess } = useStatus()
  const { inputData: registerDTO, handleInputTextChange } =
    useInput<RegisterDTO>({ displayName: '', email: '', password: '' })

  const validateInput = async () => {
    const { error } = await validateRegisterDTOUseCase.invoke(registerDTO)
    if (error instanceof ValidationError) {
      setStatus(Status.ERROR)
      setFieldError(error.fields)
      return false
    }

    setFieldError({})
    return true
  }

  const register = async () => {
    setFieldError({})
    setStatus(Status.PROCESSING)

    const { error } = await registerUseCase.invoke(registerDTO)
    if (error instanceof ValidationError) {
      setStatus(Status.ERROR)
      setFieldError(error.fields)
      return
    }
    if (error instanceof UserAlreadyRegisteredError) {
      setStatus(Status.ERROR)
      setFieldError({
        email: 'Email is already being used. Consider logging in instead.',
      })
      return
    }

    setStatus(Status.SUCCESS)
  }

  const handleRegister = async () => {
    if (await validateInput()) await register()
  }

  return {
    isInitial,
    isProcessing,
    isSuccess,
    isError,
    fieldError,
    handleRegister,
    handleInputTextChange,
  }
}
