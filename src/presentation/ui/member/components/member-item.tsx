import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Role } from '~/domain/model/group'

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
  return (
    <View style={styles.container}>
      <Avatar name={name} />
      <View style={styles.textContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.role}>
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

const styles = StyleSheet.create({
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
    color: '#535250',
    fontWeight: '600',
    fontSize: 18,
  },
  role: {
    fontSize: 14,
    color: '#a4a4a4',
    fontWeight: '600',
  },
})

export default MemberItem
