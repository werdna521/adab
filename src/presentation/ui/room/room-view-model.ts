import Voice, { SpeechResultsEvent } from '@react-native-voice/voice'
import { useKeepAwake } from '@sayem314/react-native-keep-awake'
import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { ScrollView } from 'react-native'

import { SubscribeToRoomStateUseCase } from '~/interactor/room'
import PublishNewContentUseCase from '~/interactor/room/publish-new-content'

type Params = {
  subscribeToRoomStateUseCase: SubscribeToRoomStateUseCase
  publishNewContentUseCase: PublishNewContentUseCase
  scrollViewRef: RefObject<ScrollView>
  roomID: string
  groupID: string
}

export const useRoomViewModel = (params: Params) => {
  const {
    subscribeToRoomStateUseCase,
    publishNewContentUseCase,
    roomID,
    groupID,
    scrollViewRef,
  } = params

  const [isRecording, setIsRecording] = useState(false)
  const [content, setContent] = useState('')
  const isRecordingRef = useRef(isRecording)
  useKeepAwake()

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
          newContent: `${content} ${newValue}`,
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
      return
    }

    setIsRecording(true)
    isRecordingRef.current = true
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
      callback: (room) => {
        setContent(room.content)
      },
    })

    return () => unsubscribe()
  }, [subscribeToRoomStateUseCase, roomID, groupID])

  return {
    content,
    handleMicToggle,
    isRecording,
  }
}
