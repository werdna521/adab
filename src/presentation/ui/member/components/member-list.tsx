import React, { FC } from 'react'
import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native'

import { getNotchSize } from '~/presentation/notch'

import MemberItem from './member-item'

type Props = {
  members: Record<string, string>
  onRefresh: () => void
  isRefreshing: boolean
}

const MemberList: FC<Props> = ({ members, onRefresh, isRefreshing }) => {
  const renderGroupItem: ListRenderItem<string> = ({ item: displayName }) => {
    return <MemberItem name={displayName} />
  }
  const renderHeader = () => <Text style={styles.title}>Members</Text>

  return (
    <FlatList
      contentContainerStyle={styles.container}
      renderItem={renderGroupItem}
      data={Object.values(members)}
      keyExtractor={(member) => `member-item-${member}`}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={View}
      ListFooterComponentStyle={styles.footer}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: getNotchSize() + 20,
    paddingHorizontal: 20,
  },
  footer: {
    height: 120,
  },
  empty: {
    fontSize: 16,
    color: '#1d2d48',
  },
  title: {
    fontSize: 28,
    color: '#1d2d48',
    fontWeight: '600',
    marginBottom: 16,
  },
})

export default MemberList
