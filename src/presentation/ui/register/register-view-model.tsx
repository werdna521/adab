import { useState } from 'react'
import { RegisterDTO } from '../../../domain/repository/auth-repository'
import { RegisterUseCase } from '../../../interactor/auth'

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

  const [registerDTO, setRegisterDTO] = useState<RegisterDTO>({
    displayName: '',
    email: '',
    password: '',
  })
  const [status, setStatus] = useState(Status.INITIAL)
  const isInitial = status === Status.INITIAL
  const isProcessing = status === Status.PROCESSING
  const isSuccess = status === Status.SUCCESS
  const isError = status === Status.ERROR

  const register = async () => {
    setStatus(Status.PROCESSING)
    try {
      await registerUseCase.invoke(registerDTO)
      setStatus(Status.SUCCESS)
    } catch (error) {
      console.log(error)
      setStatus(Status.ERROR)
    }
  }

  const handleInputTextChange = (key: keyof RegisterDTO) => (text: string) => {
    setRegisterDTO({
      ...registerDTO,
      [key]: text,
    })
  }

  return {
    isInitial,
    isProcessing,
    isSuccess,
    isError,
    register,
    handleInputTextChange,
  }
}
