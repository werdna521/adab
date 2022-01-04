import Voice from '@react-native-voice/voice'
import { SpeechResultsEvent } from '@react-native-voice/voice/src/VoiceModuleTypes'
import { RouteProp, useRoute } from '@react-navigation/native'
import React, { FC, useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { RootStackParamList } from '../components/navigator/root'
import { Screen } from '../constants/enums'
import { streamContent, updateContent } from '../lib/firebase/db'

type CreateRoomScreenRouteProp = RouteProp<RootStackParamList, Screen.ROOM>

const RoomScreen: FC = () => {
  const [content, setContent] = useState('')
  const route = useRoute<CreateRoomScreenRouteProp>()
  const { roomId } = route.params

  useEffect(() => {
    const handleStream = (stream: string) => setContent(stream)

    // stream room content from firestore
    const unsubscribe = streamContent({
      roomId,
      onStream: handleStream,
    })

    return () => {
      // unsubscribe from firestore when leaving screen
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    let speechResult = ''
    let contentText = content

    Voice.onSpeechStart = () => console.log('start')
    Voice.onSpeechPartialResults = (event: SpeechResultsEvent) => {
      const text = event?.value?.[0]
      if (text) {
        speechResult = text
      }
    }
    Voice.onSpeechEnd = async () => {
      console.log('end')

      if (speechResult) {
        const { error } = await updateContent({
          roomId,
          content: `${contentText} ${speechResult}`,
        })
        if (error) return alert('cannot send message for some reason')

        contentText = `${contentText} ${speechResult}`
        speechResult = ''
      }

      Voice.start('id', {
        EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: 0,
      })
    }
    Voice.onSpeechError = () => {
      console.log('error')
      Voice.start('id', {
        EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: 0,
      })
    }
    Voice.onSpeechRecognized = () => console.log('recognized')

    Voice.start('id', {
      EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: 0,
    })
    return () => {
      Voice.destroy()
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text>Room </Text>
      <Text>{content}</Text>
    </View>
  )
}

export default RoomScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderColor: '#000',
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 8,
    width: '80%',
  },
})
