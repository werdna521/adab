import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'

import { Room } from '~/domain/model'
import GetGroupDetailsUseCase from '~/interactor/group/get-group-details-use-case'
import GetGroupInviteLinkUseCase from '~/interactor/group/get-group-invite-link-use-case'
import { SearchRoomUseCase } from '~/interactor/room'
import GetRoomListUseCase from '~/interactor/room/get-room-list-use-case'
import { Screen, Screens } from '~/presentation/navigation'

import { CreateFAB } from '../common/components'
import { RoomList } from './components'
import { useGroupViewModel } from './group-view-model'

type Props = {
  getRoomListUseCase: GetRoomListUseCase
  getGroupDetailsUseCase: GetGroupDetailsUseCase
  getGroupInviteLinkUseCase: GetGroupInviteLinkUseCase
  searchRoomUseCase: SearchRoomUseCase
}

const GroupScreen: Screen<Props, Screens.GROUP> = ({
  getRoomListUseCase,
  getGroupDetailsUseCase,
  getGroupInviteLinkUseCase,
  searchRoomUseCase,
  navigation,
  route,
  user,
}) => {
  const { groupID } = route.params
  const {
    filteredRoomList,
    group,
    query,
    isRoomListLoading,
    loadRoomList,
    loadGroup,
    handleCopyInviteLink,
    handleQueryChange,
  } = useGroupViewModel({
    getRoomListUseCase,
    getGroupDetailsUseCase,
    getGroupInviteLinkUseCase,
    searchRoomUseCase,
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
  const navigateToRoom = (room: Room) =>
    navigation.navigate(Screens.ROOM, { room, group })
  const navigateToCreateRoom = () =>
    navigation.navigate(Screens.CREATE_ROOM, { group })

  if (!group) return null

  return (
    <View style={styles.container}>
      <RoomList
        group={group!}
        query={query}
        roomList={filteredRoomList}
        onRefresh={() => loadRoomList(groupID)}
        navigateToRoom={navigateToRoom}
        navigateToMember={navigateToMember}
        isProcessing={isRoomListLoading}
        handleCopyInviteLink={handleCopyInviteLink}
        handleQueryChange={handleQueryChange}
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
