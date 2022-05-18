import { useCallback, useState } from 'react'

import { UnknownError } from '~/common/error'
import { Group, User } from '~/domain/model'
import GetGroupListUseCase from '~/interactor/group/get-group-list-use-case'

import { Status, useStatus } from '../common/hooks'

type Params = {
  user: User
  getGroupListUseCase: GetGroupListUseCase
}

export const useHomeViewModel = (params: Params) => {
  const { user, getGroupListUseCase } = params

  const [globalError, setGlobalError] = useState('')
  const [groupList, setGroupList] = useState<Group[]>([])
  const { setStatus, isProcessing } = useStatus()

  const loadGroupList = useCallback(async () => {
    setStatus(Status.PROCESSING)

    const { data, error } = await getGroupListUseCase.invoke(user)
    if (error instanceof UnknownError) {
      setStatus(Status.ERROR)
      setGlobalError('Error loading group list')
      return
    }

    setStatus(Status.SUCCESS)
    setGroupList(data || [])
  }, [getGroupListUseCase, setStatus, user])

  return { loadGroupList, isProcessing, globalError, groupList }
}
