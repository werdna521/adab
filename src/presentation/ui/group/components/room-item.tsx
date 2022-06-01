import React, { FC } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import { Room } from '~/domain/model'

type Props = {
  style?: StyleProp<ViewStyle>
  navigateToRoom: () => void
  room: Room
}

const MONTHS = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
]

const RoomItem: FC<Props> = ({ style, navigateToRoom, room }) => {
  const createdTimestamp = room.createdAt.toDate()

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.5}
      onPress={navigateToRoom}
    >
      <View style={styles.topContainer}>
        <Text style={styles.title}>{room.title}</Text>
        <View style={styles.spacer} />
        <View>
          <Text style={styles.date}>
            {createdTimestamp.getDate()} {MONTHS[createdTimestamp.getMonth()]}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fbf1a3',
    padding: 24,
    borderRadius: 24,
  },
  topContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    color: '#1d2d48',
    fontWeight: '600',
    flexGrow: 1,
    flexShrink: 1,
  },
  date: {
    fontSize: 12,
    marginTop: 8,
    color: '#979053',
    fontWeight: '600',
  },
  time: {
    fontSize: 14,
    marginTop: 8,
    color: '#979053',
    fontWeight: '600',
    textAlign: 'right',
  },
  spacer: {
    width: 8,
  },
})

export default RoomItem
