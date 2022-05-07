import React, { FC } from 'react'
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'

import { getNotchSize } from '~/presentation/notch'

import Greeting from './greeting'
import GroupItem from './group-item'

type Props = {
  displayName: string
}

const GroupList: FC<Props> = ({ displayName }) => {
  const renderGroupItem: ListRenderItem<number> = ({}) => <GroupItem />
  const renderHeader = () => <Greeting displayName={displayName} />
  const renderSeparator = () => <View style={styles.separator} />

  return (
    <FlatList
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      data={[1, 2, 3, 4, 5, 6, 7]}
      renderItem={renderGroupItem}
      keyExtractor={(item) => `group-item-${item}`}
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
