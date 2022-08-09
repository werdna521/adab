import React, { useRef } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { SubscribeToRoomStateUseCase } from '~/interactor/room'
import EndMeetingUseCase from '~/interactor/room/end-meeting-use-case'
import GetEndMeetingPermissionUseCase from '~/interactor/room/get-end-meeting-permission-use-case'
import PublishNewContentUseCase from '~/interactor/room/publish-new-content'
import { getColor } from '~/presentation/colors'
import { Screen, Screens } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'
import { useTheme } from '~/presentation/theme'

import { Button, TextButton } from '../common/components'
import { MicOff, MicOn } from './components'
import { useRoomViewModel } from './room-view-model'

type Props = {
  subscribeToRoomStateUseCase: SubscribeToRoomStateUseCase
  publishNewContentUseCase: PublishNewContentUseCase
  endMeetingUseCase: EndMeetingUseCase
  getEndMeetingPermissionUseCase: GetEndMeetingPermissionUseCase
}

const RoomView: Screen<Props, Screens.ROOM> = ({
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
  const { isLowVisionMode } = useTheme()

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
    <View style={styles(isLowVisionMode).container}>
      <Text style={styles(isLowVisionMode).title}>{roomTitle}</Text>
      <ScrollView
        ref={scrollViewRef}
        style={styles(isLowVisionMode).scrollView}
      >
        <Text style={styles(isLowVisionMode).content}>{content}</Text>
      </ScrollView>
      {!isEnded && (
        <View style={styles(isLowVisionMode).buttonContainer}>
          {canEndMeeting && (
            <TextButton
              color="#F32013"
              style={styles(isLowVisionMode).endButton}
              textStyle={styles(isLowVisionMode).endButtonText}
              onPress={handleEndMeeting}
            >
              End Meeting
            </TextButton>
          )}
          {canEndMeeting && (
            <Button onPress={handleMicToggle} minWidth={50} primary>
              {isRecording ? <MicOn /> : <MicOff />}
            </Button>
          )}
        </View>
      )}
      {isEnded && canEndMeeting && (
        <Button
          style={styles(isLowVisionMode).editButton}
          onPress={navigateToEditTranscript}
          primary
        >
          Edit Transcript
        </Button>
      )}
    </View>
  )
}

const styles = (isLowVisionMode: boolean) =>
  StyleSheet.create({
    container: {
      height: '100%',
      paddingTop: getNotchSize() + 16,
    },
    title: {
      fontSize: 18,
      color: getColor('#101010', isLowVisionMode),
      fontFamily: 'Satoshi-Bold',
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: getColor('#dfdfdf', isLowVisionMode),
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
      color: getColor('#101010', isLowVisionMode),
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

export default RoomView
