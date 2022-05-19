import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { SubscribeToRoomStateUseCase } from '~/interactor/room'
import { Screen, Screens } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'

import { useRoomViewModel } from './room-view-model'

type Props = {
  subscribeToRoomStateUseCase: SubscribeToRoomStateUseCase
}

const RoomScreen: Screen<Props, Screens.ROOM> = ({
  subscribeToRoomStateUseCase,
}) => {
  const { content } = useRoomViewModel({ subscribeToRoomStateUseCase })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Writing Contract Using Interfaces</Text>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.content}>{content}</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: getNotchSize() + 20,
    paddingHorizontal: 20,
    backgroundColor: '#2c2c2c',
  },
  title: {
    fontSize: 24,
    color: '#f3f2ed',
    textAlign: 'center',
  },
  scrollView: {
    marginTop: 16,
  },
  content: {
    fontSize: 16,
    color: 'white',
  },
})

export default RoomScreen
