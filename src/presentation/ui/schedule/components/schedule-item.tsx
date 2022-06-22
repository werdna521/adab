import React, { FC } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'

import { Group, Room } from '~/domain/model'

type Props = {
  room: Room
  group: Group
  navigateToGroup: () => void
  index: number
  style?: StyleProp<ViewStyle>
}

const COLORS: Record<number, string> = {
  0: '#9bb1fe',
  1: '#b08ee4',
  2: '#f39072',
  3: '#3472df',
}

const ScheduleItem: FC<Props> = (props) => {
  const { room, group, navigateToGroup, style } = props

  return (
    <TouchableOpacity
      style={[styles(props).container, style]}
      activeOpacity={0.5}
      onPress={navigateToGroup}
    >
      <Text style={styles(props).title}>{room.title}</Text>
      <Text style={styles(props).group}>#{group.name}</Text>
    </TouchableOpacity>
  )
}

const styles = ({ index }: Props) =>
  StyleSheet.create({
    container: {
      backgroundColor: COLORS[index % Object.values(COLORS).length],
      padding: 24,
      borderRadius: 24,
    },
    title: {
      fontSize: 16,
      color: '#fdfff1',
      fontFamily: 'Satoshi-Bold',
    },
    group: {
      fontSize: 14,
      color: '#fdfff1',
      fontFamily: 'Satoshi-Medium',
    },
  })

export default ScheduleItem
