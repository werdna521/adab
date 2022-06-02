import { useEffect, useState } from 'react'
import { Alert } from 'react-native'

import { UnknownError } from '~/common/error'
import { Group, User } from '~/domain/model'
import GetGroupDetailsUseCase from '~/interactor/group/get-group-details-use-case'
import JoinGroupUseCase from '~/interactor/group/join-group-use-case'

import { Status, useStatus } from '../common/hooks'

type Params = {
  groupID: string
  user: User
  getGroupDetailsUseCase: GetGroupDetailsUseCase
  joinGroupUseCase: JoinGroupUseCase
}

export const useJoinViewModel = (params: Params) => {
  const { groupID, user, joinGroupUseCase, getGroupDetailsUseCase } = params

  const { isProcessing, setStatus } = useStatus()
  const [group, setGroup] = useState<Group>()
  const [isAlreadyMember, setIsAlreadyMember] = useState(false)

  useEffect(() => {
    setStatus(Status.PROCESSING)

    getGroupDetailsUseCase.invoke(groupID).then(({ data, error }) => {
      if (error instanceof UnknownError) {
        setStatus(Status.ERROR)
        return
      }

      const isAlreadyInGroup = !!data!.members[user.uid]
      setIsAlreadyMember(isAlreadyInGroup)

      setStatus(Status.SUCCESS)
      setGroup(data as Group)
    })
  }, [getGroupDetailsUseCase, groupID, setStatus, user])

  const handleJoinGroup = async () => {
    setStatus(Status.PROCESSING)

    const { error } = await joinGroupUseCase.invoke({
      group: group!,
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
    isAlreadyMember,
    handleJoinGroup,
    group,
  }
}
