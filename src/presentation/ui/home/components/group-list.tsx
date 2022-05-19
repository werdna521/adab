import React, { FC } from 'react'
import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native'

import { Group } from '~/domain/model'
import { getNotchSize } from '~/presentation/notch'

import Greeting from './greeting'
import GroupItem from './group-item'

type Props = {
  groupList: Group[]
  displayName: string
  onRefresh: () => void
  navigateToGroup: () => void
  isRefreshing: boolean
}

const GroupList: FC<Props> = ({
  groupList,
  displayName,
  onRefresh,
  navigateToGroup,
  isRefreshing,
}) => {
  const renderGroupItem: ListRenderItem<Group> = ({ item: group }) => (
    <GroupItem navigateToGroup={navigateToGroup} group={group} />
  )
  const renderHeader = () => <Greeting displayName={displayName} />
  const renderSeparator = () => <View style={styles.separator} />
  const renderEmpty = () => <Text style={styles.empty}>No group yet.</Text>

  return (
    <FlatList
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      data={groupList}
      renderItem={renderGroupItem}
      keyExtractor={(group) => `group-item-${group.uid}`}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
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

export default GroupList
