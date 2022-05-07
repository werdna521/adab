import { useState } from 'react'

import { UserNotRegistered, ValidationError } from '~/domain/error'
import WrongCredentialsError from '~/domain/error/wrong-credentials'
import { LoginDTO } from '~/domain/repository/auth-repository'
import LoginUseCase from '~/interactor/auth/login-use-case'
import ValidateLoginDTOUseCase from '~/interactor/validation/validate-login-dto-use-case'

import { Status, useInput, useStatus } from '../common/hooks'

type Params = {
  loginUseCase: LoginUseCase
  validateLoginDTOUseCase: ValidateLoginDTOUseCase
}

export const useLoginViewModel = (params: Params) => {
  const { loginUseCase, validateLoginDTOUseCase } = params

  const [fieldError, setFieldError] = useState<Record<string, string>>({})
  const [globalError, setGlobalError] = useState('')
  const { setStatus, isError, isInitial, isProcessing, isSuccess } = useStatus()
  const { inputData: loginDTO, handleInputTextChange } = useInput<LoginDTO>({
    email: '',
    password: '',
  })

  const validateInput = async () => {
    const { error } = await validateLoginDTOUseCase.invoke(loginDTO)
    if (error instanceof ValidationError) {
      setStatus(Status.ERROR)
      setFieldError(error.fields)
      return false
    }

    setFieldError({})
    return true
  }

  const login = async () => {
    setFieldError({})
    setGlobalError('')
    setStatus(Status.PROCESSING)

    const { error } = await loginUseCase.invoke(loginDTO)
    if (error instanceof WrongCredentialsError) {
      setStatus(Status.ERROR)
      setGlobalError('Email or password is incorrect')
      return
    }
    if (error instanceof UserNotRegistered) {
      setStatus(Status.ERROR)
      setGlobalError('User not registered. Consider to sign up first.')
      return
    }

    setStatus(Status.SUCCESS)
  }

  const handleLogin = async () => {
    if (await validateInput()) await login()
  }

  return {
    isError,
    isInitial,
    isProcessing,
    isSuccess,
    globalError,
    fieldError,
    handleLogin,
    handleInputTextChange,
  }
}
