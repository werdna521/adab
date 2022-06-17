import React, { useRef } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { SubscribeToRoomStateUseCase } from '~/interactor/room'
import EndMeetingUseCase from '~/interactor/room/end-meeting-use-case'
import GetEndMeetingPermissionUseCase from '~/interactor/room/get-end-meeting-permission-use-case'
import PublishNewContentUseCase from '~/interactor/room/publish-new-content'
import { Screen, Screens } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'

import { Button, TextButton } from '../common/components'
import { MicOff, MicOn } from './components'
import { useRoomViewModel } from './room-view-model'

type Props = {
  subscribeToRoomStateUseCase: SubscribeToRoomStateUseCase
  publishNewContentUseCase: PublishNewContentUseCase
  endMeetingUseCase: EndMeetingUseCase
  getEndMeetingPermissionUseCase: GetEndMeetingPermissionUseCase
}

const RoomScreen: Screen<Props, Screens.ROOM> = ({
  subscribeToRoomStateUseCase,
  publishNewContentUseCase,
  endMeetingUseCase,
  getEndMeetingPermissionUseCase,
  route,
  user,
  navigation,
}) => {
  const { group, room: roomState } = route.params
  const { uid: groupID } = group

  const scrollViewRef = useRef<ScrollView>(null)
  const {
    room,
    handleMicToggle,
    handleEndMeeting,
    isRecording,
    canEndMeeting,
  } = useRoomViewModel({
    subscribeToRoomStateUseCase,
    publishNewContentUseCase,
    endMeetingUseCase,
    getEndMeetingPermissionUseCase,
    roomState,
    groupID,
    scrollViewRef,
    user: user!,
    members: group.members,
  })
  const { content, title: roomTitle, isEnded } = room

  const navigateToEditTranscript = () => {
    navigation.navigate(Screens.EDIT_TRANSCRIPT, { group, room })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{roomTitle}</Text>
      <ScrollView ref={scrollViewRef} style={styles.scrollView}>
        <Text style={styles.content}>{content}</Text>
      </ScrollView>
      {!isEnded && (
        <View style={styles.buttonContainer}>
          {canEndMeeting && (
            <TextButton
              color="#F32013"
              style={styles.endButton}
              textStyle={styles.endButtonText}
              onPress={handleEndMeeting}
            >
              End Meeting
            </TextButton>
          )}
          <Button onPress={handleMicToggle} minWidth={50} primary>
            {isRecording ? <MicOn /> : <MicOff />}
          </Button>
        </View>
      )}
      {isEnded && canEndMeeting && (
        <Button
          style={styles.editButton}
          onPress={navigateToEditTranscript}
          primary
        >
          Edit Transcript
        </Button>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: getNotchSize() + 16,
  },
  title: {
    fontSize: 18,
    color: '#101010',
    fontFamily: 'Satoshi-Bold',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#dfdfdf',
    paddingBottom: 20,
  },
  scrollView: {
    paddingTop: 20,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  content: {
    fontSize: 16,
    fontFamily: 'Satoshi-Medium',
    color: '#101010',
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
  },
  editButton: {
    marginBottom: 24,
  },
})

export default RoomScreen
