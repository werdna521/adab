import { useCallback, useState } from 'react'

import { UnknownError } from '~/common/error'
import { Group, User } from '~/domain/model'
import GetGroupListUseCase from '~/interactor/group/get-group-list-use-case'

import { Status, useStatus } from '../common/hooks'

type Params = {
  user: User
  getGroupListUseCase: GetGroupListUseCase
}

export const useGroupListViewModel = (params: Params) => {
  const { setStatus, isProcessing } = useStatus()

  const { user, getGroupListUseCase } = params

  const [globalError, setGlobalError] = useState('')
  const [groupList, setGroupList] = useState<
    { title: string; data: Group[] }[]
  >([])

  const loadGroupList = useCallback(async () => {
    setStatus(Status.PROCESSING)

    const { data, error } = await getGroupListUseCase.invoke(user)
    if (error instanceof UnknownError) {
      setStatus(Status.ERROR)
      setGlobalError('Error loading group list')
      return
    }

    setStatus(Status.SUCCESS)

    const groupListSectionMap = data!.reduce(
      (acc: Record<string, Group[]>, curr: Group) => {
        const label = curr.label || 'No Label'
        const previousSection = acc[label] || []
        return {
          ...acc,
          [label]: [...previousSection, curr],
        }
      },
      {},
    )
    setGroupList(
      Object.entries(groupListSectionMap).map(([label, group]) => ({
        title: label,
        data: group,
      })),
    )
  }, [getGroupListUseCase, setStatus, user])

  return { loadGroupList, isProcessing, globalError, groupList }
}
