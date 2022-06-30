import { Timestamp } from 'firebase/firestore'
import { useCallback, useMemo, useState } from 'react'

import { UnknownError } from '~/common/error'
import { Group, Room, User } from '~/domain/model'
import GetScheduledRoomUseCase from '~/interactor/room/get-scheduled-room-list-use-case'
import { getColor } from '~/presentation/colors'
import { useTheme } from '~/presentation/theme'

import { Status, useStatus } from '../common/hooks'

type Params = {
  getScheduledRoomList: GetScheduledRoomUseCase
  user: User
}

const COLORS: Record<number, string> = {
  0: '#9bb1fe',
  1: '#b08ee4',
  2: '#f39072',
  3: '#3472df',
}

export const useScheduleViewModel = (params: Params) => {
  const { getScheduledRoomList, user } = params
  const { isLowVisionMode } = useTheme()

  const [scheduledRoomList, setScheduledRoomList] = useState<
    Record<
      string,
      {
        timestamp: Timestamp
        data: {
          room: Room
          group: Group
        }[]
      }
    >
  >({})
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const { isProcessing, setStatus } = useStatus()
  const markedDates = useMemo(() => {
    return Object.values(scheduledRoomList).map(({ timestamp, data }) => ({
      date: timestamp.toDate(),
      dots: data.map((_, index) => ({
        color: getColor(
          COLORS[index % Object.values(COLORS).length],
          isLowVisionMode,
        ),
        selectedColor: 'transparent',
      })),
    }))
  }, [scheduledRoomList, isLowVisionMode])
  const selectedRoomList = useMemo(() => {
    const key = `${selectedDate.getDate()}-${selectedDate.getMonth()}-${selectedDate.getFullYear()}`
    const selectedRecord = scheduledRoomList[key]
    return selectedRecord?.data || []
  }, [selectedDate, scheduledRoomList])

  const loadScheduledRoomList = useCallback(async () => {
    setStatus(Status.PROCESSING)

    const { data, error } = await getScheduledRoomList.invoke({
      userID: user.uid,
    })
    if (error instanceof UnknownError) {
      setStatus(Status.ERROR)
      return
    }

    setStatus(Status.SUCCESS)
    setScheduledRoomList(data!)
  }, [getScheduledRoomList, setStatus, user.uid])

  const handleDateSelect = (date: any) => {
    setSelectedDate(date.toDate())
  }

  return {
    isProcessing,
    loadScheduledRoomList,
    handleDateSelect,
    selectedRoomList,
    markedDates,
    selectedDate,
  }
}
