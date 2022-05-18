import React, { FC } from 'react'
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'

import { Group } from '~/domain/model'
import { getNotchSize } from '~/presentation/notch'

import Greeting from './greeting'
import GroupItem from './group-item'

type Props = {
  groupList: Group[]
  displayName: string
}

const GroupList: FC<Props> = ({ groupList, displayName }) => {
  const renderGroupItem: ListRenderItem<Group> = ({ item: group }) => (
    <GroupItem group={group} />
  )
  const renderHeader = () => <Greeting displayName={displayName} />
  const renderSeparator = () => <View style={styles.separator} />

  return (
    <FlatList
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      data={groupList}
      renderItem={renderGroupItem}
      keyExtractor={(group) => `group-item-${group.uid}`}
      ItemSeparatorComponent={renderSeparator}
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
  separator: {
    marginTop: 12,
  },
  footer: {
    height: 120,
  },
})

export default GroupList
