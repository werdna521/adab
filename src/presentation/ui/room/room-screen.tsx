import React, { useRef } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { SubscribeToRoomStateUseCase } from '~/interactor/room'
import PublishNewContentUseCase from '~/interactor/room/publish-new-content'
import { Screen, Screens } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'

import { Button, TextButton } from '../common/components'
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
      <View style={styles.buttonContainer}>
        <TextButton
          color="#F32013"
          style={styles.endButton}
          textStyle={styles.endButtonText}
          onPress={() => alert('hey')}
        >
          End Meeting
        </TextButton>
        <Button onPress={handleMicToggle} minWidth={50} primary>
          {isRecording ? <MicOn /> : <MicOff />}
        </Button>
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  endButton: {
    marginRight: 32,
  },
  endButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
})

export default RoomScreen
