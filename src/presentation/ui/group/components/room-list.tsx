import React, { FC } from 'react'
import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native'

import { getNotchSize } from '~/presentation/notch'
import { TextButton } from '~/presentation/ui/common/components'

import RoomItem from './room-item'

type Props = {}

const RoomList: FC<Props> = ({}) => {
  const renderGroupItem: ListRenderItem<number> = ({}) => <RoomItem />
  const renderHeader = () => (
    <>
      <Text style={styles.header}>Object Oriented Programming</Text>
      <TextButton style={styles.seeMembers}>See members{'  '}&gt;</TextButton>
    </>
  )
  const renderSeparator = () => <View style={styles.separator} />
  const renderEmpty = () => <Text style={styles.empty}>No group yet.</Text>

  return (
    <FlatList
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      data={[1]}
      renderItem={renderGroupItem}
      keyExtractor={(room) => `room-item-${room}`}
      ItemSeparatorComponent={renderSeparator}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={View}
      ListFooterComponentStyle={styles.footer}
      ListEmptyComponent={renderEmpty}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: getNotchSize() + 20,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    color: '#1d2d48',
    fontWeight: '600',
  },
  seeMembers: {
    paddingRight: 0,
    alignSelf: 'flex-end',
    marginBottom: 24,
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
