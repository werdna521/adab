import { useState } from 'react'

import { ValidationError } from '~/domain/error'
import { RegisterDTO } from '~/domain/repository/auth-repository'
import { RegisterUseCase } from '~/interactor/auth'
import { ValidateRegisterDTOUseCase } from '~/interactor/validation'

export enum Status {
  INITIAL = 'INITIAL',
  PROCESSING = 'processing',
  SUCCESS = 'success',
  ERROR = 'error',
}

type Params = {
  registerUseCase: RegisterUseCase
  validateRegisterDTOUseCase: ValidateRegisterDTOUseCase
}
export const useRegisterViewModel = (params: Params) => {
  const { registerUseCase, validateRegisterDTOUseCase } = params

  const [registerDTO, setRegisterDTO] = useState<RegisterDTO>({
    displayName: '',
    email: '',
    password: '',
  })
  const [status, setStatus] = useState(Status.INITIAL)
  const [fieldError, setFieldError] = useState<Record<string, string>>({})
  const isInitial = status === Status.INITIAL
  const isProcessing = status === Status.PROCESSING
  const isSuccess = status === Status.SUCCESS
  const isError = status === Status.ERROR

  const validateInput = async () => {
    const { error } = await validateRegisterDTOUseCase.invoke(registerDTO)
    if (error instanceof ValidationError) {
      setFieldError(error.fields)
      return false
    }

    setFieldError({})
    return true
  }

  const register = async () => {
    setStatus(Status.PROCESSING)

    const { error } = await registerUseCase.invoke(registerDTO)
    if (error) {
      setStatus(Status.ERROR)
      return
    }

    setStatus(Status.SUCCESS)
  }

  const handleInputTextChange = (key: keyof RegisterDTO) => (text: string) => {
    setRegisterDTO({
      ...registerDTO,
      [key]: text,
    })
  }

  const handleRegister = async () => {
    if (await validateInput()) register()
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
