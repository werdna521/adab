import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Role } from '~/domain/model/group'
import { getColor } from '~/presentation/colors'
import { useTheme } from '~/presentation/theme'

import Avatar from './avatar'
import MemberContextMenu from './member-context-menu'

type Props = {
  name: string
  role: Role
  isSelf: boolean
  canRemoveMember: boolean
  canEditRole: boolean
  handleMemberRoleUpdate: () => Promise<void>
  handleRemoveMember: () => Promise<void>
}

const MemberItem: FC<Props> = ({
  name,
  role,
  isSelf,
  canRemoveMember,
  canEditRole,
  handleMemberRoleUpdate,
  handleRemoveMember,
}) => {
  const { isLowVisionMode } = useTheme()
  return (
    <View style={styles(isLowVisionMode).container}>
      <Avatar name={name} />
      <View style={styles(isLowVisionMode).textContainer}>
        <Text style={styles(isLowVisionMode).name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles(isLowVisionMode).role}>
          {role.charAt(0).toUpperCase()}
          {role.slice(1)}
        </Text>
      </View>
      <MemberContextMenu
        isSelf={isSelf}
        canRemoveMember={canRemoveMember}
        canEditRole={canEditRole}
        handleMemberRoleUpdate={handleMemberRoleUpdate}
        handleRemoveMember={handleRemoveMember}
      />
    </View>
  )
}

const styles = (isLowVisionMode: boolean) =>
  StyleSheet.create({
    container: {
      paddingVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    textContainer: {
      marginLeft: 16,
      maxWidth: '80%',
      flexGrow: 1,
    },
    name: {
      color: getColor('#101010', isLowVisionMode),
      fontFamily: 'Satoshi-Bold',
      fontSize: 18,
    },
    role: {
      fontSize: 14,
      color: getColor('#aaa', isLowVisionMode),
      fontFamily: 'Satoshi-Medium',
    },
  })

export default MemberItem
