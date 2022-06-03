import React, { useRef } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { SubscribeToRoomStateUseCase } from '~/interactor/room'
import PublishNewContentUseCase from '~/interactor/room/publish-new-content'
import { Screen, Screens } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'

import { Button } from '../common/components'
import { MicOff, MicOn } from './components'
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
  const scrollViewRef = useRef<ScrollView>(null)
  const { roomID, roomTitle, groupID } = route.params
  const { content, handleMicToggle, isRecording } = useRoomViewModel({
    subscribeToRoomStateUseCase,
    publishNewContentUseCase,
    roomID,
    groupID,
    scrollViewRef,
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{roomTitle}</Text>
      <ScrollView ref={scrollViewRef} style={styles.scrollView}>
        <Text style={styles.content}>{content}</Text>
      </ScrollView>
      <Button style={styles.button} onPress={handleMicToggle} primary>
        {isRecording ? <MicOn /> : <MicOff />}
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: getNotchSize(),
    backgroundColor: '#2c2c2c',
  },
  title: {
    fontSize: 18,
    color: '#f3f2ed',
    fontWeight: '700',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#3c3c3c',
    paddingBottom: 8,
  },
  scrollView: {
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  content: {
    fontSize: 16,
    color: 'white',
  },
  button: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
})

export default RoomScreen
