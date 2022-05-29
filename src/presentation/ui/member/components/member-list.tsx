import React, { FC } from 'react'
import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native'
import { MenuProvider } from 'react-native-popup-menu'

import { Member, MemberWithAccessProperties } from '~/domain/model/group'
import { getNotchSize } from '~/presentation/notch'

import MemberItem from './member-item'

type Props = {
  membersWithAccessProperties: Record<string, MemberWithAccessProperties>
}

const MemberList: FC<Props> = ({ membersWithAccessProperties }) => {
  const renderGroupItem: ListRenderItem<
    [string, MemberWithAccessProperties]
  > = ({ item: [_, member] }) => {
    return (
      <MemberItem
        name={member.name}
        role={member.role}
        isSelf={member.isSelf}
        canEditRole={member.canEditRole}
        canRemoveMember={member.canRemoveMember}
      />
    )
  }
  const renderHeader = () => <Text style={styles.title}>Members</Text>

  return (
    <MenuProvider>
      <FlatList
        contentContainerStyle={styles.container}
        renderItem={renderGroupItem}
        data={Object.entries(membersWithAccessProperties)}
        keyExtractor={([id]) => `member-item-${id}`}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={View}
        ListFooterComponentStyle={styles.footer}
      />
    </MenuProvider>
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
