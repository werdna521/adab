import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'

import GetRoomListUseCase from '~/interactor/room/get-room-list-use-case'
import { Screen, Screens } from '~/presentation/navigation'

import { CreateFAB } from '../common/components'
import { RoomList } from './components'
import { useGroupViewModel } from './group-view-model'

type Props = {
  getRoomListUseCase: GetRoomListUseCase
}

const GroupScreen: Screen<Props, Screens.GROUP> = ({
  getRoomListUseCase,
  navigation,
  route,
}) => {
  const { group } = route.params
  const { uid: groupID, members } = group
  const { roomList, isProcessing, loadRoomList, handleCopyInviteLink } =
    useGroupViewModel({
      getRoomListUseCase,
    })

  useFocusEffect(
    useCallback(() => {
      loadRoomList(groupID)
    }, [loadRoomList, groupID]),
  )

  const navigateToMember = () =>
    navigation.navigate(Screens.MEMBER, { members, groupID })
  const navigateToRoom = (roomID: string) =>
    navigation.navigate(Screens.ROOM, { groupID, roomID })
  const navigateToCreateRoom = () =>
    navigation.navigate(Screens.CREATE_ROOM, { group })

  return (
    <View style={styles.container}>
      <RoomList
        group={group}
        roomList={roomList}
        onRefresh={() => loadRoomList(groupID)}
        navigateToRoom={navigateToRoom}
        navigateToMember={navigateToMember}
        isProcessing={isProcessing}
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
