import { useEffect, useState } from 'react'

import { SubscribeToRoomStateUseCase } from '~/interactor/room'

type Params = {
  subscribeToRoomStateUseCase: SubscribeToRoomStateUseCase
}

export const useRoomViewModel = (params: Params) => {
  const { subscribeToRoomStateUseCase } = params

  const [content, setContent] = useState('')

  useEffect(() => {
    const unsubscribe = subscribeToRoomStateUseCase.invoke({
      roomID: 'z1u7t52Lrdn3furIvaBW',
      groupID: 'F3PNu4NMrPD7pfPDpZL8',
      callback: (room) => {
        setContent(room.content)
      },
    })

    return () => unsubscribe()
  }, [subscribeToRoomStateUseCase])

  return {
    content,
  }
}
