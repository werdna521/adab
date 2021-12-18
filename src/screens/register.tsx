import React, { FC, useState } from 'react'
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  ToastAndroid,
} from 'react-native'
import { signUpWithEmail } from '../lib/firebase/auth'

const RegisterScreen: FC = () => {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handlePress = async () => {
    await signUpWithEmail({ email, password, displayName })
    ToastAndroid.show('Successfully signed up', ToastAndroid.SHORT)
  }

  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Display Name"
        value={displayName}
        onChangeText={setDisplayName}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button onPress={handlePress} title="Register" />
    </View>
  )
}

export default RegisterScreen

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
