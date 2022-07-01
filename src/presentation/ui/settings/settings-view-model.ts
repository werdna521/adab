import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'

import { UnknownError } from '~/common/error'
import LogOutUseCase from '~/interactor/auth/logout-use-case'
import { useTheme } from '~/presentation/theme'

import { Status, useStatus } from '../common/hooks'

type Params = {
  logOutUseCase: LogOutUseCase
}

export const useSettingsViewModel = (params: Params) => {
  const { logOutUseCase } = params

  const { toggleLowVisionMode } = useTheme()
  const [globalError, setGlobalError] = useState('')
  const { setStatus, isProcessing } = useStatus()

  const handleLogOut = async () => {
    setStatus(Status.PROCESSING)

    const { error } = await logOutUseCase.invoke()
    if (error instanceof UnknownError) {
      setStatus(Status.ERROR)
      setGlobalError('Cannot logout')
      return
    }

    setStatus(Status.SUCCESS)
  }

  const handleLowVisionModeToggle = () => {
    AsyncStorage.setItem('isLowVisionMode', `${toggleLowVisionMode()}`)
  }

  return {
    globalError,
    isProcessing,
    handleLogOut,
    handleLowVisionModeToggle,
  }
}
