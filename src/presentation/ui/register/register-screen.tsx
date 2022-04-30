import React, { useEffect } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'

import { RegisterUseCase } from '~/interactor/auth'
import { Screen, Screens } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'
import { Button, InputGroup } from '~/presentation/ui/common/components'

import { useRegisterViewModel } from './register-view-model'

type Props = {
  registerUseCase: RegisterUseCase
}

const RegisterScreen: Screen<Props, Screens.REGISTER> = ({
  registerUseCase,
  // navigation,
}) => {
  const { isSuccess, isProcessing, register, handleInputTextChange } =
    useRegisterViewModel({
      registerUseCase,
    })

  useEffect(() => {
    if (isSuccess) Alert.alert('yay')
  }, [isSuccess])

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Register</Text>
        <InputGroup
          label="Full Name"
          onChangeText={handleInputTextChange('displayName')}
        />
        <InputGroup
          label="Email"
          style={styles.inputGroup}
          onChangeText={handleInputTextChange('email')}
        />
        <InputGroup
          label="Password"
          style={styles.inputGroup}
          onChangeText={handleInputTextChange('password')}
          secureTextEntry
        />
      </View>
      <Button onPress={register} disabled={isProcessing}>
        Sign Up
      </Button>
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
  inputGroup: {
    marginTop: 12,
  },
})

export default RegisterScreen
