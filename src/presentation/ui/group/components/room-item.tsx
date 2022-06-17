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

const RoomItem: FC<Props> = ({ style, navigateToRoom, room }) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.5}
      onPress={navigateToRoom}
    >
      <View style={styles.topContainer}>
        <Text style={styles.title}>{room.title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#b08ee4',
    padding: 24,
    borderRadius: 24,
  },
  topContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    color: '#fdfff1',
    fontFamily: 'Satoshi-Bold',
    flexGrow: 1,
    flexShrink: 1,
  },
  time: {
    fontSize: 14,
    marginTop: 8,
    color: '#979053',
    fontWeight: '600',
    textAlign: 'right',
  },
})

export default RoomItem
