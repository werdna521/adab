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
    inputData: { title },
    handleInputTextChange,
  } = useInput({
    title: '',
  })

  const handleCreateRoom = async () => {
    setStatus(Status.PROCESSING)

    const { error } = await createRoomUseCase.invoke({
      roomTitle: title,
      groupID,
    })
    if (error instanceof UnknownError) {
      setStatus(Status.ERROR)
      setGlobalError('Something went wrong. Please try again')
      return
    }

    setStatus(Status.SUCCESS)
  }

  return {
    handleInputTextChange,
    handleCreateRoom,
    globalError,
    isProcessing,
  }
}
