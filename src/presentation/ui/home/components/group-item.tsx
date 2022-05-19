import React, { FC } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'

import { Group } from '~/domain/model'

type Props = {
  group: Group
  navigateToGroup: () => void
  style?: StyleProp<ViewStyle>
}

const GroupItem: FC<Props> = ({ group, navigateToGroup, style }) => {
  const memberCount = Object.keys(group.members).length
  const unit = memberCount > 1 ? 'people' : 'person'

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.5}
      onPress={navigateToGroup}
    >
      <Text style={styles.title}>{group.name}</Text>
      <Text style={styles.member}>
        {memberCount} {unit}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fbf1a3',
    padding: 24,
    borderRadius: 24,
  },
  title: {
    fontSize: 18,
    color: '#1d2d48',
    fontWeight: '600',
  },
  member: {
    fontSize: 14,
    color: '#979053',
    fontWeight: '600',
    marginTop: 4,
  },
})

export default GroupItem
