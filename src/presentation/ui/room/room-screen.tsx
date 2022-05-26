import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { SubscribeToRoomStateUseCase } from '~/interactor/room'
import PublishNewContentUseCase from '~/interactor/room/publish-new-content'
import { Screen, Screens } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'

import { Button } from '../common/components'
import { useRoomViewModel } from './room-view-model'

type Props = {
  subscribeToRoomStateUseCase: SubscribeToRoomStateUseCase
  publishNewContentUseCase: PublishNewContentUseCase
}

const RoomScreen: Screen<Props, Screens.ROOM> = ({
  subscribeToRoomStateUseCase,
  publishNewContentUseCase,
  route,
}) => {
  const { roomID, groupID } = route.params
  const { content, handleMicToggle, isRecording } = useRoomViewModel({
    subscribeToRoomStateUseCase,
    publishNewContentUseCase,
    roomID,
    groupID,
  })

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.content}>{content}</Text>
      </ScrollView>
      <Button style={styles.button} onPress={handleMicToggle} primary>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </Button>
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
  button: {
    marginBottom: 24,
  },
})

export default RoomScreen
