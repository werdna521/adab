import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { FC, useState } from 'react'
import { Text, View, StyleSheet, Button, TextInput } from 'react-native'
import { RootStackParamList } from '../components/navigator/root'
import { useAuth } from '../lib/auth/auth-context'
import { createRoom } from '../lib/firebase/db/create-room'

type CreateRoomScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CreateRoom'
>

const CreateRoomScreen: FC = () => {
  const [roomName, setRoomName] = useState('')
  const { user } = useAuth()
  const navigation = useNavigation<CreateRoomScreenNavigationProp>()

  const handleCreate = async () => {
    if (!roomName) {
      return alert('Room name cannot be empty')
    }

    const { id, error } = await createRoom({ name: roomName, user })
    if (error) return alert('Failed to create room')

    navigation.navigate('Room', { roomId: id })
  }

  return (
    <View style={styles.container}>
      <Text>Create room</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Room Name"
        value={roomName}
        onChangeText={setRoomName}
      />
      <Button title="Create Room" onPress={handleCreate} />
    </View>
  )
}

export default CreateRoomScreen

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
