import { useState } from 'react'

import { UnknownError } from '~/common/error'
import ChangeNameUseCase from '~/interactor/auth/change-name-use-case'

import { Status, useInput, useStatus } from '../common/hooks'

type Params = {
  changeNameUseCase: ChangeNameUseCase
}

const MIN_NAME_LENGTH = 1

export const useChangeNameViewModel = (params: Params) => {
  const { changeNameUseCase } = params

  const [globalError, setGlobalError] = useState('')
  const [fieldError, setFieldError] = useState({
    displayName: '',
  })
  const { isProcessing, setStatus } = useStatus()
  const {
    inputData: { displayName },
    handleInputTextChange,
  } = useInput({
    displayName: '',
  })

  const handleChangeName = async (): Promise<boolean> => {
    setStatus(Status.PROCESSING)

    const isNameTooShort = displayName.length < MIN_NAME_LENGTH
    if (isNameTooShort) {
      setFieldError({
        displayName: "Name can't be empty",
      })
      setGlobalError('')
      setStatus(Status.ERROR)
      return false
    }

    const { error } = await changeNameUseCase.invoke(displayName)
    if (error instanceof UnknownError) {
      setGlobalError('Something went wrong.')
      setStatus(Status.ERROR)
      return false
    }

    setStatus(Status.SUCCESS)
    setFieldError({
      displayName: '',
    })
    setGlobalError('')
    return true
  }

  return {
    handleInputTextChange,
    handleChangeName,
    isProcessing,
    globalError,
    fieldError,
  }
}
