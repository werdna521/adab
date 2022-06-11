import { useCallback, useState } from 'react'
import { ToastAndroid } from 'react-native'

import { UnknownError } from '~/common/error'
import { Group, Room, User } from '~/domain/model'
import GetGroupDetailsUseCase from '~/interactor/group/get-group-details-use-case'
import GetGroupInviteLinkUseCase from '~/interactor/group/get-group-invite-link-use-case'
import GetRoomListUseCase from '~/interactor/room/get-room-list-use-case'

import { Status, useStatus } from '../common/hooks'

type Params = {
  user: User
  getRoomListUseCase: GetRoomListUseCase
  getGroupDetailsUseCase: GetGroupDetailsUseCase
  getGroupInviteLinkUseCase: GetGroupInviteLinkUseCase
}

export const useGroupViewModel = (params: Params) => {
  const {
    user,
    getRoomListUseCase,
    getGroupDetailsUseCase,
    getGroupInviteLinkUseCase,
  } = params
  const [roomList, setRoomList] = useState<{ title: string; data: Room[] }[]>(
    [],
  )
  const [group, setGroup] = useState<Group>()
  const { isProcessing: isRoomListLoading, setStatus: setRoomStatus } =
    useStatus()
  const { isProcessing: isGroupLoading, setStatus: setGroupStatus } =
    useStatus()

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
          const timestamp = curr.timestamp?.toDate() || new Date()
          const localizedTimestamp = `${timestamp
            .getDate()
            .toString()
            .padStart(2, '0')}/${(timestamp.getMonth() + 1)
            .toString()
            .padStart(2, '0')}/${timestamp.getFullYear()}`
          const previousSection = acc[localizedTimestamp] || []
          return {
            ...acc,
            [localizedTimestamp]: [...previousSection, curr],
          }
        },
        {},
      )
      setRoomList(
        Object.entries(roomListSectionMap)
          .map(([timestamp, room]) => ({
            title: timestamp,
            data: room,
          }))
          .sort((a, b) => a.title.localeCompare(b.title)),
      )
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
    group,
    handleCopyInviteLink,
  }
}
