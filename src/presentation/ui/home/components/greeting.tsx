import React, { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { COLORS } from '~/presentation/colors'

type Props = {
  displayName: string
  navigateToSettings: () => void
}

const Greeting: FC<Props> = ({ displayName, navigateToSettings }) => {
  const [firstName] = displayName.split(' ')

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.top}>Hi,</Text>
        <Text style={styles.bottom}>{firstName}</Text>
      </View>
      <TouchableOpacity
        style={styles.settings}
        onPress={navigateToSettings}
        activeOpacity={0.6}
      >
        <Icon name="settings" color="#1d2d48" size={24} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  textContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.BACKGROUND,
    marginBottom: 48,
  },
  top: {
    fontSize: 28,
    color: '#1d2d48',
    fontWeight: '500',
  },
  bottom: {
    fontSize: 28,
    color: '#1d2d48',
    fontWeight: '600',
  },
  settings: {
    borderRadius: 16,
    width: 32,
    height: 32,
  },
})

export default Greeting
