import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RegisterUseCase } from '../../domain/usecase/auth'

import { getNotchSize } from '../../infrastructure/notch'
import Button from '../common/button'
import InputGroup from '../common/input-group'
import { Status, useRegisterViewModel } from './register-view-model'

type Props = {
  registerUseCase: RegisterUseCase
}

const RegisterScreen: FC<Props> = ({ registerUseCase }) => {
  const { register, status } = useRegisterViewModel({ registerUseCase })

  if (status === Status.PROCESSING) return <Text>Processing...</Text>

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Hey, Welcome to ADAB</Text>
        <InputGroup label="Full Name" />
        <InputGroup label="Email" style={{ marginTop: 12 }} />
        <InputGroup
          label="Password"
          style={{ marginTop: 12 }}
          secureTextEntry
        />
      </View>
      <Button onPress={register}>Sign Up</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: getNotchSize() + 40,
    paddingBottom: 48,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    height: '100%',
  },
  title: {
    fontSize: 28,
    color: '#1d2d48',
    fontWeight: '600',
    marginBottom: 24,
  },
})

export default RegisterScreen
