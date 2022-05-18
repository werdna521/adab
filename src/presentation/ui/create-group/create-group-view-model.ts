import { useState } from 'react'

import { UnknownError } from '~/common/error'
import { User } from '~/domain/model'
import { CreateGroupUseCase } from '~/interactor/group'

import { Status, useInput, useStatus } from '../common/hooks'

type Params = {
  user: User
  createGroupUseCase: CreateGroupUseCase
}

export const useCreateGroupViewModel = (params: Params) => {
  const { createGroupUseCase, user } = params

  const [globalError, setGlobalError] = useState('')
  const { setStatus, isProcessing } = useStatus()
  const {
    inputData: { groupName },
    handleInputTextChange,
  } = useInput({
    groupName: '',
  })

  const handleCreateGroup = async () => {
    setStatus(Status.PROCESSING)

    const { error } = await createGroupUseCase.invoke({
      groupName,
      user,
    })
    if (error instanceof UnknownError) {
      setStatus(Status.ERROR)
      setGlobalError('Something went wrong, please try again.')
      return
    }

    setStatus(Status.SUCCESS)
  }

  return {
    handleInputTextChange,
    handleCreateGroup,
    globalError,
    isProcessing,
  }
}
