import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu'
import Icon from 'react-native-vector-icons/MaterialIcons'

import ContextAction from './context-action'

type Props = {
  isSelf: boolean
  canEditRole: boolean
  canRemoveMember: boolean
  handleMemberRoleUpdate: () => Promise<void>
  handleRemoveMember: () => Promise<void>
}

const MemberContextMenu: FC<Props> = ({
  isSelf,
  canEditRole,
  canRemoveMember,
  handleMemberRoleUpdate,
  handleRemoveMember,
}) => {
  if (isSelf) return null
  if (!canEditRole && !canRemoveMember) return null

  return (
    <Menu style={styles.container}>
      <MenuTrigger>
        <View style={styles.threeDots}>
          <Icon name="more-vert" size={20} color="#535250" />
        </View>
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: styles.contextMenuContainer,
        }}
      >
        {canEditRole && (
          <MenuOption
            onSelect={handleMemberRoleUpdate}
            style={styles.menuOption}
          >
            <ContextAction>Edit Role</ContextAction>
          </MenuOption>
        )}
        {canRemoveMember && (
          <MenuOption onSelect={handleRemoveMember} style={styles.menuOption}>
            <ContextAction>Remove Member</ContextAction>
          </MenuOption>
        )}
      </MenuOptions>
    </Menu>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'flex-end',
  },
  threeDots: {
    width: 28,
    height: 28,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contextMenuContainer: {
    paddingVertical: 8,
  },
  menuOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
})

export default MemberContextMenu
