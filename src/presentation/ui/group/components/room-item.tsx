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
import { getColor } from '~/presentation/colors'
import { useTheme } from '~/presentation/theme'

type Props = {
  style?: StyleProp<ViewStyle>
  navigateToRoom: () => void
  room: Room
}

const RoomItem: FC<Props> = ({ style, navigateToRoom, room }) => {
  const { isLowVisionMode } = useTheme()

  return (
    <TouchableOpacity
      style={[styles(isLowVisionMode).container, style]}
      activeOpacity={0.5}
      onPress={navigateToRoom}
    >
      <View style={styles(isLowVisionMode).topContainer}>
        <Text style={styles(isLowVisionMode).title}>{room.title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = (isLowVisionMode: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: getColor('#b08ee4', isLowVisionMode),
      padding: 24,
      borderRadius: 24,
    },
    topContainer: {
      flexDirection: 'row',
    },
    title: {
      fontSize: 16,
      color: getColor('#fdfff1', isLowVisionMode),
      fontFamily: 'Satoshi-Bold',
      flexGrow: 1,
      flexShrink: 1,
    },
    time: {
      fontSize: 14,
      marginTop: 8,
      color: getColor('#979053', isLowVisionMode),
      fontWeight: '600',
      textAlign: 'right',
    },
  })

export default RoomItem
