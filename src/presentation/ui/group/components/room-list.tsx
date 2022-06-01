import React, { FC } from 'react'
import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native'

import { Group, Room } from '~/domain/model'
import { getNotchSize } from '~/presentation/notch'

import GroupHeader from './header'
import RoomItem from './room-item'

type Props = {
  group: Group
  navigateToRoom: (roomUID: string) => void
  navigateToMember: () => void
  roomList: Room[]
  onRefresh: () => void
  isProcessing: boolean
  handleCopyInviteLink: () => void
}

const RoomList: FC<Props> = ({
  group,
  navigateToRoom,
  navigateToMember,
  roomList,
  onRefresh,
  isProcessing,
  handleCopyInviteLink,
}) => {
  const renderGroupItem: ListRenderItem<Room> = ({ item: room }) => (
    <RoomItem room={room} navigateToRoom={() => navigateToRoom(room.uid)} />
  )
  const renderHeader = () => (
    <GroupHeader
      navigateToMember={navigateToMember}
      group={group}
      handleCopyInviteLink={handleCopyInviteLink}
    />
  )
  const renderSeparator = () => <View style={styles.separator} />
  const renderEmpty = () => <Text style={styles.empty}>No group yet.</Text>

  return (
    <FlatList
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      data={roomList}
      renderItem={renderGroupItem}
      keyExtractor={(room) => `room-item-${room.uid}`}
      ItemSeparatorComponent={renderSeparator}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={View}
      ListFooterComponentStyle={styles.footer}
      ListEmptyComponent={renderEmpty}
      onRefresh={onRefresh}
      refreshing={isProcessing}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: getNotchSize() + 20,
    paddingHorizontal: 20,
  },
  separator: {
    marginTop: 12,
  },
  footer: {
    height: 120,
  },
  empty: {
    fontSize: 16,
    color: '#1d2d48',
  },
})

export default RoomList
