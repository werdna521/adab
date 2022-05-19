import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Screen, Screens } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'

type Props = {}

const RoomScreen: Screen<Props, Screens.ROOM> = () => {
  return (
    <View style={styles.container}>
      <Text>Room</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: getNotchSize() + 20,
    paddingHorizontal: 20,
  },
})

export default RoomScreen
