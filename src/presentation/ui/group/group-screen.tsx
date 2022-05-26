import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

import GetRoomListUseCase from '~/interactor/room/get-room-list-use-case'
import { Screen, Screens } from '~/presentation/navigation'

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
  const { roomList, isProcessing, loadRoomList } = useGroupViewModel({
    getRoomListUseCase,
  })

  useEffect(() => {
    loadRoomList(groupID)
  }, [loadRoomList, groupID])

  const navigateToMember = () =>
    navigation.navigate(Screens.MEMBER, { members })
  const navigateToRoom = (roomID: string) =>
    navigation.navigate(Screens.ROOM, { groupID, roomID })

  return (
    <View style={styles.container}>
      <RoomList
        roomList={roomList}
        onRefresh={() => loadRoomList(groupID)}
        navigateToRoom={navigateToRoom}
        navigateToMember={navigateToMember}
        isProcessing={isProcessing}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
})

export default GroupScreen
