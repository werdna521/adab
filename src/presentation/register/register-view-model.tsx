import { useState } from 'react'
import { RegisterUseCase } from '../../domain/usecase/auth'

export enum Status {
  INITIAL = 'INITIAL',
  PROCESSING = 'processing',
  SUCCESS = 'success',
  ERROR = 'error',
}

type Params = {
  registerUseCase: RegisterUseCase
}
export const useRegisterViewModel = (params: Params) => {
  const { registerUseCase } = params

  const [status, setStatus] = useState(Status.INITIAL)

  const register = async () => {
    setStatus(Status.PROCESSING)
    try {
      await registerUseCase.invoke()
      setStatus(Status.SUCCESS)
    } catch {
      setStatus(Status.ERROR)
    }
  }

  return { status, register }
}
