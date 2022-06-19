import { useState } from 'react'

import { UnknownError } from '~/common/error'
import ChangePasswordUseCase from '~/interactor/auth/change-password-use-case'

import { Status, useInput, useStatus } from '../common/hooks'

type Params = {
  changePasswordUseCase: ChangePasswordUseCase
}

const MIN_PASSWORD_LENGTH = 6

export const useChangePasswordViewModel = (params: Params) => {
  const { changePasswordUseCase } = params

  const [globalError, setGlobalError] = useState('')
  const [fieldError, setFieldError] = useState({
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  })
  const { isProcessing, setStatus } = useStatus()
  const {
    inputData: { oldPassword, newPassword, newPasswordConfirm },
    handleInputTextChange,
  } = useInput({
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  })

  const handleChangePassword = async (): Promise<boolean> => {
    setStatus(Status.PROCESSING)

    const isPasswordTooShort = newPassword.length < MIN_PASSWORD_LENGTH
    if (isPasswordTooShort) {
      setFieldError({
        oldPassword: '',
        newPassword: 'Password must be at least 6 characters',
        newPasswordConfirm: '',
      })
      setGlobalError('')
      setStatus(Status.ERROR)
      return false
    }

    const isPasswordDifferent = newPassword !== newPasswordConfirm
    if (isPasswordDifferent) {
      setFieldError({
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: "Password doesn't match",
      })
      setGlobalError('')
      setStatus(Status.ERROR)
      return false
    }

    const { error } = await changePasswordUseCase.invoke({
      newPassword,
      oldPassword,
    })
    if (error instanceof UnknownError) {
      setGlobalError('')
      setStatus(Status.ERROR)
      setFieldError({
        oldPassword: 'Wrong password',
        newPassword: '',
        newPasswordConfirm: '',
      })
      return false
    }

    setStatus(Status.SUCCESS)
    setFieldError({
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    })
    setGlobalError('')
    return true
  }

  return {
    handleInputTextChange,
    handleChangePassword,
    isProcessing,
    globalError,
    fieldError,
  }
}
