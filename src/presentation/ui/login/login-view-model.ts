import { useState } from 'react'

import { UserNotRegistered } from '~/domain/error'
import WrongCredentialsError from '~/domain/error/wrong-credentials'
import { LoginDTO } from '~/domain/repository/auth-repository'
import LoginUseCase from '~/interactor/auth/login-use-case'

import { Status, useInput, useStatus } from '../common/hooks'

type Params = {
  loginUseCase: LoginUseCase
}

export const useLoginViewModel = (params: Params) => {
  const { loginUseCase } = params

  const [fieldError, setFieldError] = useState<Record<string, string>>({})
  const [globalError, setGlobalError] = useState('')
  const { setStatus, isError, isInitial, isProcessing, isSuccess } = useStatus()
  const { inputData: loginDTO, handleInputTextChange } = useInput<LoginDTO>({
    email: '',
    password: '',
  })

  const handleLogin = async () => {
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
    console.log(error)

    setStatus(Status.SUCCESS)
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
