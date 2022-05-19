import React, { FC } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

type Props = {
  style?: StyleProp<ViewStyle>
  navigateToRoom: () => void
}

const RoomItem: FC<Props> = ({ style, navigateToRoom }) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.5}
      onPress={navigateToRoom}
    >
      <View style={styles.topContainer}>
        <Text style={styles.title}>Writing Contract Using Interfaces</Text>
        <View style={styles.spacer} />
        <View>
          <Text style={styles.date}>4 APR 2022</Text>
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
