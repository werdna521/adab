import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { FC, useState } from 'react'
import { Text, View, StyleSheet, Button, TextInput } from 'react-native'
import { RootStackParamList } from '../components/navigator/root'
import { Screen } from '../constants/enums'
import { useAuth } from '../lib/auth/auth-context'
import { joinRoom } from '../lib/firebase/db/join-room'

type JoinRoomScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  Screen.JOIN_ROOM
>

const JoinRoomScreen: FC = () => {
  const [roomId, setRoomId] = useState('')
  const navigation = useNavigation<JoinRoomScreenNavigationProp>()
  const { user } = useAuth()

  const handleCreate = async () => {
    // TODO: check whether room exists
    if (!roomId) {
      return alert('Room name cannot be empty')
    }

    const { error } = await joinRoom({ roomId, user })
    if (error) return alert('Cannot join room for some reason')

    navigation.navigate(Screen.ROOM, { roomId })
  }

  return (
    <View style={styles.container}>
      <Text>Join room</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Room ID"
        value={roomId}
        onChangeText={setRoomId}
      />
      <Button title="Create Room" onPress={handleCreate} />
    </View>
  )
}

export default JoinRoomScreen

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
