import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { COLORS } from '~/presentation/colors'

type Props = {
  displayName: string
}

const Greeting: FC<Props> = ({ displayName }) => {
  const [firstName] = displayName.split(' ')

  return (
    <View style={styles.container}>
      <Text style={styles.top}>Hi,</Text>
      <Text style={styles.bottom}>{firstName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
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
})

export default Greeting
