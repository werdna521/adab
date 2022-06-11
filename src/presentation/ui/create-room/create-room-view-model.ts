import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { useState } from 'react'

import { UnknownError } from '~/common/error'
import CreateRoomUseCase from '~/interactor/room/create-room-use-case'

import { Status, useInput, useStatus } from '../common/hooks'

type Params = {
  groupID: string
  createRoomUseCase: CreateRoomUseCase
}

export const useCreateRoomViewModel = (params: Params) => {
  const { groupID, createRoomUseCase } = params

  const [globalError, setGlobalError] = useState('')
  const { setStatus, isProcessing } = useStatus()
  const {
    inputData: { title, timestamp },
    handleInputTextChange,
  } = useInput({
    title: '',
    timestamp: new Date(),
  })

  const localizedTimestamp = `${timestamp
    .getDate()
    .toString()
    .padStart(2, '0')}/${(timestamp.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${timestamp.getFullYear()}`

  const handleCreateRoom = async () => {
    setStatus(Status.PROCESSING)

    const { error } = await createRoomUseCase.invoke({
      roomTitle: title,
      timestamp,
      groupID,
    })
    if (error instanceof UnknownError) {
      setStatus(Status.ERROR)
      setGlobalError('Something went wrong. Please try again')
      return
    }

    setStatus(Status.SUCCESS)
  }

  const handleTimePickerOpen = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      mode: 'date',
      onChange: ({ type, nativeEvent }) => {
        if (type === 'set') {
          const date = new Date(nativeEvent.timestamp!)
          handleInputTextChange('timestamp')(date)
        }
      },
    })
  }

  return {
    handleInputTextChange,
    handleTimePickerOpen,
    handleCreateRoom,
    globalError,
    isProcessing,
    timestamp: localizedTimestamp,
  }
}
