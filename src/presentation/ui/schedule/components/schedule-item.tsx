import React, { FC } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'

import { Group, Room } from '~/domain/model'
import { getColor } from '~/presentation/colors'
import { useTheme } from '~/presentation/theme'

type Props = {
  room: Room
  group: Group
  navigateToRoom: () => void
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
  const { room, group, navigateToRoom, style } = props
  const { isLowVisionMode } = useTheme()

  return (
    <TouchableOpacity
      style={[styles({ ...props, isLowVisionMode }).container, style]}
      activeOpacity={0.5}
      onPress={navigateToRoom}
    >
      <Text style={styles({ ...props, isLowVisionMode }).title}>
        {room.title}
      </Text>
      <Text style={styles({ ...props, isLowVisionMode }).group}>
        #{group.name}
      </Text>
    </TouchableOpacity>
  )
}

const styles = ({
  index,
  isLowVisionMode,
}: Props & { isLowVisionMode: boolean }) =>
  StyleSheet.create({
    container: {
      backgroundColor: getColor(
        COLORS[index % Object.values(COLORS).length],
        isLowVisionMode,
      ),
      padding: 24,
      borderRadius: 24,
    },
    title: {
      fontSize: 16,
      color: getColor('#fdfff1', isLowVisionMode),
      fontFamily: 'Satoshi-Bold',
    },
    group: {
      fontSize: 14,
      color: getColor('#fdfff1', isLowVisionMode),
      fontFamily: 'Satoshi-Medium',
    },
  })

export default ScheduleItem
