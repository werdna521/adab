import { RouteProp, useRoute } from '@react-navigation/native'
import React, { FC, useEffect, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button } from 'react-native'
import { RootStackParamList } from '../components/navigator/root'
import { streamContent } from '../lib/firebase/db/stream-content'
import { updateContent } from '../lib/firebase/db/update-content'

type CreateRoomScreenRouteProp = RouteProp<RootStackParamList, 'Room'>

const RoomScreen: FC = () => {
  const [value, setValue] = useState('')
  const [content, setContent] = useState('')
  const route = useRoute<CreateRoomScreenRouteProp>()
  const { roomId } = route.params

  useEffect(() => {
    const handleStream = (stream: string) => setContent(stream)

    const unSubscribe = streamContent({
      roomId,
      onStream: handleStream,
    })

    return () => {
      unSubscribe()
    }
  }, [])

  const handleSend = async () => {
    const { error } = await updateContent({
      roomId,
      content: `${content} ${value}`,
    })
    if (error) return alert('cannot send message for some reason')

    setValue('')
  }

  return (
    <View style={styles.container}>
      <Text>Room</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Chat Test"
        value={value}
        onChangeText={setValue}
      />
      <Button title="Send Text" onPress={handleSend} />
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
