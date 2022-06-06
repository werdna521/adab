import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

type Props = {
  name: string
}

const Avatar: FC<Props> = ({ name }) => {
  const initials = name
    ?.split(' ')
    .map((char) => char.charAt(0)?.toUpperCase())
    .slice(0, 2)
    .join('')

  return (
    <View style={styles.container}>
      <Text style={styles.initials}>{initials}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
    borderRadius: 32,
    backgroundColor: '#46b2ff',
  },
  initials: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
})

export default Avatar
