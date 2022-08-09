import { useCallback, useState } from 'react'
import { ToastAndroid } from 'react-native'

import { UnknownError } from '~/common/error'
import { Group, Room, User } from '~/domain/model'
import GetGroupDetailsUseCase from '~/interactor/group/get-group-details-use-case'
import GetGroupInviteLinkUseCase from '~/interactor/group/get-group-invite-link-use-case'
import { SearchRoomUseCase } from '~/interactor/room'
import GetRoomListUseCase from '~/interactor/room/get-room-list-use-case'

import { Status, useInput, useStatus } from '../common/hooks'

type Params = {
  user: User
  getRoomListUseCase: GetRoomListUseCase
  getGroupDetailsUseCase: GetGroupDetailsUseCase
  getGroupInviteLinkUseCase: GetGroupInviteLinkUseCase
  searchRoomUseCase: SearchRoomUseCase
}

export const useGroupViewModel = (params: Params) => {
  const {
    user,
    getRoomListUseCase,
    getGroupDetailsUseCase,
    getGroupInviteLinkUseCase,
    searchRoomUseCase,
  } = params
  const [roomList, setRoomList] = useState<{ title: string; data: Room[] }[]>(
    [],
  )
  const [filteredRoomList, setFilteredRoomList] = useState<
    { title: string; data: Room[] }[]
  >([])
  const [group, setGroup] = useState<Group>()
  const { isProcessing: isRoomListLoading, setStatus: setRoomStatus } =
    useStatus()
  const { isProcessing: isGroupLoading, setStatus: setGroupStatus } =
    useStatus()
  const {
    inputData: { query },
    handleInputTextChange,
  } = useInput({
    query: '',
  })

  const getLocalizedDate = (date?: Date): string => {
    if (!date) return 'Unscheduled'

    const MONTHS = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const dayOfMonth = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const today = new Date()

    if (
      dayOfMonth === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      return 'Today'
    }

    return `${MONTHS[month]} ${dayOfMonth}, ${year}`
  }

  const handleSearch = (value: string) => {
    handleInputTextChange('query')(value)
    if (value === '') {
      setFilteredRoomList(roomList)
      return
    }

    searchRoomUseCase
      .invoke({
        roomList,
        query,
      })
      .then(({ data, error }) => {
        if (error instanceof UnknownError) {
          // fail silently
          return
        }

        setFilteredRoomList(data!)
      })
  }

  const loadRoomList = useCallback(
    async (groupID: string) => {
      setRoomStatus(Status.PROCESSING)

      const { data, error } = await getRoomListUseCase.invoke({
        groupID,
      })
      if (error instanceof UnknownError) {
        setRoomStatus(Status.ERROR)
        return
      }

      setRoomStatus(Status.SUCCESS)
      const roomListSectionMap = data!.reduce(
        (acc: Record<string, Room[]>, curr) => {
          const timestamp = curr.timestamp?.toDate()
          const localizedTimestamp = getLocalizedDate(timestamp)
          const previousSection = acc[localizedTimestamp] || []
          return {
            ...acc,
            [localizedTimestamp]: [...previousSection, curr],
          }
        },
        {},
      )
      const newRoomList = Object.entries(roomListSectionMap)
        .map(([timestamp, room]) => ({
          title: timestamp,
          data: room,
        }))
        .sort((a, b) => {
          if (a.title === 'Today') return -1
          if (b.title === 'Today') return 1
          return a.title.localeCompare(b.title)
        })
      setRoomList(newRoomList)
      setFilteredRoomList((prevState) => {
        if (prevState.length === 0) return newRoomList
        return prevState
      })
    },
    [getRoomListUseCase, setRoomStatus],
  )

  const loadGroup = useCallback(
    async (groupID: string) => {
      setGroupStatus(Status.PROCESSING)

      const { data, error } = await getGroupDetailsUseCase.invoke(groupID)
      if (error instanceof UnknownError) {
        setGroupStatus(Status.ERROR)
        return
      }

      setGroup(data!)
      setGroupStatus(Status.SUCCESS)
    },
    [getGroupDetailsUseCase, setGroupStatus],
  )

  const handleCopyInviteLink = async () => {
    const { uid, members } = group || {}
    const { data: inviteLink, error } = await getGroupInviteLinkUseCase.invoke({
      groupID: uid!,
      members: members!,
      user,
    })
    if (error instanceof UnknownError) {
      ToastAndroid.show(
        'Cannot copy link for some reason. Please try again',
        ToastAndroid.SHORT,
      )
      return ''
    }

    return inviteLink!
  }

  return {
    isRoomListLoading,
    isGroupLoading,
    loadRoomList,
    loadGroup,
    roomList,
    filteredRoomList,
    group,
    query,
    handleCopyInviteLink,
    handleSearch,
  }
}
