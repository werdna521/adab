import { Alert } from 'react-native'

import { UnknownError } from '~/common/error'
import { User } from '~/domain/model'
import JoinGroupUseCase from '~/interactor/group/join-group-use-case'

import { Status, useStatus } from '../common/hooks'

type Params = {
  groupID: string
  user: User
  joinGroupUseCase: JoinGroupUseCase
}

export const useJoinViewModel = (params: Params) => {
  const { groupID, user, joinGroupUseCase } = params
  const { isProcessing, setStatus } = useStatus()

  const handleJoinGroup = async () => {
    setStatus(Status.PROCESSING)

    const { error } = await joinGroupUseCase.invoke({
      groupID,
      user,
    })
    if (error instanceof UnknownError) {
      setStatus(Status.ERROR)
      Alert.alert('Something went wrong. Please try again.')
      return
    }

    setStatus(Status.SUCCESS)
  }

  return {
    isProcessing,
    handleJoinGroup,
  }
}
