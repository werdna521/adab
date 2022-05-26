import Voice, { SpeechResultsEvent } from '@react-native-voice/voice'
import { useKeepAwake } from '@sayem314/react-native-keep-awake'
import { useCallback, useEffect, useRef, useState } from 'react'

import { UnknownError } from '~/common/error'
import { SubscribeToRoomStateUseCase } from '~/interactor/room'
import PublishNewContentUseCase from '~/interactor/room/publish-new-content'

type Params = {
  subscribeToRoomStateUseCase: SubscribeToRoomStateUseCase
  publishNewContentUseCase: PublishNewContentUseCase
  roomID: string
  groupID: string
}

export const useRoomViewModel = (params: Params) => {
  const {
    subscribeToRoomStateUseCase,
    publishNewContentUseCase,
    roomID,
    groupID,
  } = params

  const [isRecording, setIsRecording] = useState(false)
  const [content, setContent] = useState('')
  const isRecordingRef = useRef(isRecording)
  useKeepAwake()

  const onSpeechResults = useCallback((e: SpeechResultsEvent) => {
    const newValue = e.value?.[0]
    if (newValue) setContent((prevState) => `${prevState} ${newValue}`)

    if (isRecordingRef.current) _startRecognizing()
  }, [])
  const onSpeechError = () => {}

  const _startRecognizing = async () => {
    try {
      await Voice.start('id')
    } catch (error) {
      // fail silently
    }
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
  }, [onSpeechResults])

  // publish to server anytime local content state changes
  useEffect(() => {
    publishNewContentUseCase
      .invoke({
        roomID,
        groupID,
        newContent: content,
      })
      .then(({ error }) => {
        if (error instanceof UnknownError) {
          // fail silently
        }
      })
  }, [content, roomID, groupID, publishNewContentUseCase])

  // useEffect(() => {
  //   const unsubscribe = subscribeToRoomStateUseCase.invoke({
  //     roomID: 'z1u7t52Lrdn3furIvaBW',
  //     groupID: 'F3PNu4NMrPD7pfPDpZL8',
  //     callback: (room) => {
  //       setContent([room.content])
  //     },
  //   })

  //   return () => unsubscribe()
  // }, [subscribeToRoomStateUseCase])

  return {
    content,
    handleMicToggle,
    isRecording,
  }
}
