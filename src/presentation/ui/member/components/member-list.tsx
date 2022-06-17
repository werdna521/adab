import React, { FC } from 'react'
import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native'
import { MenuProvider } from 'react-native-popup-menu'

import { MemberWithAccessProperties } from '~/domain/model/group'
import { getNotchSize } from '~/presentation/notch'

import MemberItem from './member-item'

type Props = {
  membersWithAccessProperties: Record<string, MemberWithAccessProperties>
  handleMemberRoleUpdate: (memberID: string) => Promise<void>
  handleRemoveMember: (memberID: string) => Promise<void>
}

const MemberList: FC<Props> = ({
  membersWithAccessProperties,
  handleMemberRoleUpdate,
  handleRemoveMember,
}) => {
  const renderGroupItem: ListRenderItem<
    [string, MemberWithAccessProperties]
  > = ({ item: [id, member] }) => {
    return (
      <MemberItem
        name={member.name}
        role={member.role}
        isSelf={member.isSelf}
        canEditRole={member.canEditRole}
        canRemoveMember={member.canRemoveMember}
        handleMemberRoleUpdate={() => handleMemberRoleUpdate(id)}
        handleRemoveMember={() => handleRemoveMember(id)}
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
    paddingTop: getNotchSize() + 16,
    paddingHorizontal: 20,
  },
  footer: {
    height: 120,
  },
  empty: {
    fontSize: 16,
    color: '#101010',
    fontFamily: 'Satoshi-Medium',
  },
  title: {
    fontSize: 28,
    color: '#101010',
    fontFamily: 'Satoshi-Bold',
    marginBottom: 16,
  },
})

export default MemberList
