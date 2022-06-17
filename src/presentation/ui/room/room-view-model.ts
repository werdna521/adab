import Voice, { SpeechResultsEvent } from '@react-native-voice/voice'
import { useKeepAwake } from '@sayem314/react-native-keep-awake'
import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { ScrollView, ToastAndroid } from 'react-native'

import { UnknownError } from '~/common/error'
import { CannotEndMeetingError } from '~/domain/error'
import { Room, User } from '~/domain/model'
import { Member } from '~/domain/model/group'
import { SubscribeToRoomStateUseCase } from '~/interactor/room'
import EndMeetingUseCase from '~/interactor/room/end-meeting-use-case'
import GetEndMeetingPermissionUseCase from '~/interactor/room/get-end-meeting-permission-use-case'
import PublishNewContentUseCase from '~/interactor/room/publish-new-content'

import { Status, useStatus } from '../common/hooks'

type Params = {
  subscribeToRoomStateUseCase: SubscribeToRoomStateUseCase
  publishNewContentUseCase: PublishNewContentUseCase
  endMeetingUseCase: EndMeetingUseCase
  getEndMeetingPermissionUseCase: GetEndMeetingPermissionUseCase
  scrollViewRef: RefObject<ScrollView>
  roomState: Room
  groupID: string
  user: User
  members: Record<string, Member>
}

export const useRoomViewModel = (params: Params) => {
  const {
    subscribeToRoomStateUseCase,
    publishNewContentUseCase,
    endMeetingUseCase,
    getEndMeetingPermissionUseCase,
    roomState,
    groupID,
    user,
    members,
    scrollViewRef,
  } = params

  const [isRecording, setIsRecording] = useState(false)
  const [room, setRoom] = useState(roomState)
  const [canEndMeeting, setCanEndMeeting] = useState(false)
  const { isProcessing, setStatus } = useStatus()
  const isRecordingRef = useRef(isRecording)
  const { uid: roomID, content } = room

  useKeepAwake()

  useEffect(() => {
    getEndMeetingPermissionUseCase
      .invoke({
        user,
        members,
      })
      .then(({ data, error }) => {
        if (error) {
          // fail silently
          return
        }

        setCanEndMeeting(data)
      })
  }, [getEndMeetingPermissionUseCase, members, user])

  useEffect(() => {
    scrollViewRef.current!.scrollToEnd({
      animated: true,
    })
  }, [scrollViewRef, content])

  const onSpeechResults = useCallback(
    async (e: SpeechResultsEvent) => {
      const newValue = e.value?.[0]
      if (newValue) {
        await publishNewContentUseCase.invoke({
          roomID,
          groupID,
          newContent: content ? content + '.\n' + newValue : newValue,
        })
      }

      if (isRecordingRef.current) _startRecognizing()
    },
    [publishNewContentUseCase, content, groupID, roomID],
  )
  const onSpeechError = useCallback(() => {
    if (isRecordingRef.current) _startRecognizing()
  }, [])

  const _startRecognizing = async () => {
    try {
      await Voice.start('id')
      // fail silently
    } catch (error) {}
  }

  const handleMicToggle = () => {
    if (isRecording) {
      setIsRecording(false)
      isRecordingRef.current = false
      ToastAndroid.show('You are now muted', ToastAndroid.SHORT)
      return
    }

    setIsRecording(true)
    isRecordingRef.current = true
    ToastAndroid.show("You're unmuted. Start talking", ToastAndroid.SHORT)
    _startRecognizing()
  }

  // setup speech to text engine
  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults
    Voice.onSpeechError = onSpeechError

    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [onSpeechResults, onSpeechError])

  useEffect(() => {
    const unsubscribe = subscribeToRoomStateUseCase.invoke({
      roomID,
      groupID,
      callback: (roomCallback) => {
        setRoom((prevState) => ({
          ...prevState,
          ...roomCallback,
        }))
      },
    })

    return () => unsubscribe()
  }, [subscribeToRoomStateUseCase, roomID, groupID])

  const handleEndMeeting = async () => {
    setStatus(Status.PROCESSING)

    const { error } = await endMeetingUseCase.invoke({
      user,
      roomID,
      groupID,
      members,
    })
    if (error instanceof CannotEndMeetingError) {
      setStatus(Status.ERROR)
      // fail silently
      return
    }
    if (error instanceof UnknownError) {
      setStatus(Status.ERROR)
      // fail silently
      return
    }

    ToastAndroid.show(
      'Meeting ended. You can now edit the transcript if needed',
      ToastAndroid.CENTER,
    )
    setRoom((prevState) => ({
      ...prevState,
      isEnded: true,
    }))
    setStatus(Status.SUCCESS)
  }

  return {
    room,
    handleMicToggle,
    handleEndMeeting,
    isRecording,
    isProcessing,
    canEndMeeting,
  }
}
