import { useCallback, useState } from 'react'

import { UnknownError } from '~/common/error'
import { Room } from '~/domain/model'
import GetRoomListUseCase from '~/interactor/room/get-room-list-use-case'

import { Status, useStatus } from '../common/hooks'

type Params = {
  getRoomListUseCase: GetRoomListUseCase
}

export const useGroupViewModel = (params: Params) => {
  const { getRoomListUseCase } = params
  const [roomList, setRoomList] = useState<Room[]>([])
  const { isProcessing, setStatus } = useStatus()

  const loadRoomList = useCallback(
    async (groupID: string) => {
      setStatus(Status.PROCESSING)

      const { data, error } = await getRoomListUseCase.invoke({
        groupID,
      })
      if (error instanceof UnknownError) {
        setStatus(Status.ERROR)
        return
      }

      setRoomList(data!)
      setStatus(Status.SUCCESS)
    },
    [setStatus, getRoomListUseCase],
  )

  return {
    isProcessing,
    loadRoomList,
    roomList,
  }
}
