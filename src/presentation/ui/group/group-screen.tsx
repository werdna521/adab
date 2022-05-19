import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Screen, Screens } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'
import { TextButton } from '../common/components'

type Props = {}

const GroupScreen: Screen<Props, Screens.GROUP> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Object Oriented Programming</Text>
      <TextButton style={styles.seeMembers}>See members{'  '}&gt;</TextButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: getNotchSize() + 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: '#1d2d48',
    fontWeight: '600',
  },
  seeMembers: {
    paddingRight: 0,
    alignSelf: 'flex-end',
  },
})

export default GroupScreen
