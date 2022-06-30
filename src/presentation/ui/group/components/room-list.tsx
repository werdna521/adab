import React, { FC } from 'react'
import {
  DefaultSectionT,
  ListRenderItem,
  SectionList,
  SectionListData,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { Group, Room } from '~/domain/model'
import { getColor } from '~/presentation/colors'
import { useTheme } from '~/presentation/theme'

import GroupHeader from './header'
import RoomItem from './room-item'

type Props = {
  group: Group
  query: string
  navigateToRoom: (room: Room) => void
  navigateToMember: () => void
  roomList: SectionListData<Room, DefaultSectionT>[]
  onRefresh: () => void
  isProcessing: boolean
  handleCopyInviteLink: () => Promise<string>
  handleQueryChange: (value: string) => void
}

const RoomList: FC<Props> = ({
  group,
  query,
  navigateToRoom,
  navigateToMember,
  roomList,
  onRefresh,
  isProcessing,
  handleCopyInviteLink,
  handleQueryChange,
}) => {
  const { isLowVisionMode } = useTheme()
  const renderGroupItem: ListRenderItem<Room> = ({ item: room }) => (
    <RoomItem room={room} navigateToRoom={() => navigateToRoom(room)} />
  )
  const renderSeparator = () => (
    <View style={styles(isLowVisionMode).separator} />
  )
  const renderRoomTimestamp = ({ section: { title } }: any) => {
    return <Text style={styles(isLowVisionMode).label}>{title}</Text>
  }
  const renderSectionSeparator = () => (
    <View style={styles(isLowVisionMode).sectionSeparator} />
  )
  const renderEmpty = () => (
    <Text style={styles(isLowVisionMode).empty}>No room yet.</Text>
  )

  return (
    <>
      <GroupHeader
        navigateToMember={navigateToMember}
        group={group}
        query={query}
        handleCopyInviteLink={handleCopyInviteLink}
        handleQueryChange={handleQueryChange}
      />
      <SectionList
        contentContainerStyle={styles(isLowVisionMode).container}
        showsVerticalScrollIndicator={false}
        sections={roomList}
        renderItem={renderGroupItem}
        renderSectionHeader={renderRoomTimestamp}
        renderSectionFooter={renderSectionSeparator}
        keyExtractor={(room) => `room-item-${room.uid}`}
        ItemSeparatorComponent={renderSeparator}
        ListFooterComponent={View}
        ListFooterComponentStyle={styles(isLowVisionMode).footer}
        ListEmptyComponent={renderEmpty}
        onRefresh={onRefresh}
        refreshing={isProcessing}
      />
    </>
  )
}

const styles = (isLowVisionMode: boolean) =>
  StyleSheet.create({
    container: {
      paddingTop: 16,
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
      color: getColor('#101010', isLowVisionMode),
      fontFamily: 'Satoshi-Medium',
    },
    sectionSeparator: {
      marginTop: 24,
    },
    label: {
      color: getColor('#101010', isLowVisionMode),
      fontFamily: 'Satoshi-Medium',
      fontSize: 14,
      marginBottom: 8,
      marginLeft: 8,
    },
  })

export default RoomList
