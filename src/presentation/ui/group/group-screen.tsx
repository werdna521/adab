import React from 'react'
import { StyleSheet, View } from 'react-native'

import { Screen, Screens } from '~/presentation/navigation'

import { RoomList } from './components'

type Props = {}

const GroupScreen: Screen<Props, Screens.GROUP> = () => {
  return (
    <View style={styles.container}>
      <RoomList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
})

export default GroupScreen
