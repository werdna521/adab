import React from 'react'
import { StyleSheet, View } from 'react-native'

import { Screen, Screens } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'

import { Greeting } from './components'

type Props = {}

const HomeScreen: Screen<Props, Screens.HOME> = ({ user }) => {
  return (
    <View style={styles.container}>
      <Greeting displayName={user?.displayName!} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: getNotchSize() + 20,
    paddingHorizontal: 20,
    height: '100%',
  },
})

export default HomeScreen
