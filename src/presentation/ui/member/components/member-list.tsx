import React, { FC } from 'react'
import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native'
import { MenuProvider } from 'react-native-popup-menu'

import { MemberWithAccessProperties } from '~/domain/model/group'
import { getColor } from '~/presentation/colors'
import { getNotchSize } from '~/presentation/notch'
import { useTheme } from '~/presentation/theme'

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
  const { isLowVisionMode } = useTheme()
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
  const renderHeader = () => (
    <Text style={styles(isLowVisionMode).title}>Members</Text>
  )

  return (
    <MenuProvider>
      <FlatList
        contentContainerStyle={styles(isLowVisionMode).container}
        renderItem={renderGroupItem}
        data={Object.entries(membersWithAccessProperties)}
        keyExtractor={([id]) => `member-item-${id}`}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={View}
        ListFooterComponentStyle={styles(isLowVisionMode).footer}
      />
    </MenuProvider>
  )
}

const styles = (isLowVisionMode: boolean) =>
  StyleSheet.create({
    container: {
      paddingTop: getNotchSize() + 16,
      paddingHorizontal: 20,
    },
    footer: {
      height: 120,
    },
    empty: {
      fontSize: 16,
      color: getColor('#101010', isLowVisionMode),
      fontFamily: 'Satoshi-Medium',
    },
    title: {
      fontSize: 28,
      color: getColor('#101010', isLowVisionMode),
      fontFamily: 'Satoshi-Bold',
      marginBottom: 16,
    },
  })

export default MemberList
