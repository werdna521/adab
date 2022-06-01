import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'

import GetGroupDetailsUseCase from '~/interactor/group/get-group-details-use-case'
import GetGroupInviteLinkUseCase from '~/interactor/group/get-group-invite-link-use-case'
import GetRoomListUseCase from '~/interactor/room/get-room-list-use-case'
import { Screen, Screens } from '~/presentation/navigation'

import { CreateFAB } from '../common/components'
import { RoomList } from './components'
import { useGroupViewModel } from './group-view-model'

type Props = {
  getRoomListUseCase: GetRoomListUseCase
  getGroupDetailsUseCase: GetGroupDetailsUseCase
  getGroupInviteLinkUseCase: GetGroupInviteLinkUseCase
}

const GroupScreen: Screen<Props, Screens.GROUP> = ({
  getRoomListUseCase,
  getGroupDetailsUseCase,
  getGroupInviteLinkUseCase,
  navigation,
  route,
  user,
}) => {
  const { groupID } = route.params
  const {
    roomList,
    group,
    isRoomListLoading,
    loadRoomList,
    loadGroup,
    handleCopyInviteLink,
  } = useGroupViewModel({
    getRoomListUseCase,
    getGroupDetailsUseCase,
    getGroupInviteLinkUseCase,
    user: user!,
  })
  const { members } = group || {}

  useFocusEffect(
    useCallback(() => {
      loadRoomList(groupID)
    }, [loadRoomList, groupID]),
  )

  useFocusEffect(
    useCallback(() => {
      loadGroup(groupID)
    }, [loadGroup, groupID]),
  )

  const navigateToMember = () =>
    navigation.navigate(Screens.MEMBER, { members, groupID })
  const navigateToRoom = (roomID: string) =>
    navigation.navigate(Screens.ROOM, { groupID, roomID })
  const navigateToCreateRoom = () =>
    navigation.navigate(Screens.CREATE_ROOM, { group })

  if (!group) return null

  return (
    <View style={styles.container}>
      <RoomList
        group={group!}
        roomList={roomList}
        onRefresh={() => loadRoomList(groupID)}
        navigateToRoom={navigateToRoom}
        navigateToMember={navigateToMember}
        isProcessing={isRoomListLoading}
        handleCopyInviteLink={handleCopyInviteLink}
      />
      <CreateFAB navigateToCreate={navigateToCreateRoom} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
})

export default GroupScreen
