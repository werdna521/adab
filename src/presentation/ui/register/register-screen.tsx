import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { RegisterUseCase } from '~/interactor/auth'
import { ValidateRegisterDTOUseCase } from '~/interactor/validation'
import { Screen, Screens } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'
import { Button, InputGroup } from '~/presentation/ui/common/components'

import { useRegisterViewModel } from './register-view-model'

type Props = {
  registerUseCase: RegisterUseCase
  validateRegisterDTOUseCase: ValidateRegisterDTOUseCase
}

const RegisterScreen: Screen<Props, Screens.REGISTER> = ({
  registerUseCase,
  validateRegisterDTOUseCase,
}) => {
  const { isProcessing, fieldError, handleRegister, handleInputTextChange } =
    useRegisterViewModel({
      registerUseCase,
      validateRegisterDTOUseCase,
    })

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Register</Text>
        <InputGroup
          label="Full Name"
          placeholder="John Doe"
          onChangeText={handleInputTextChange('displayName')}
          error={fieldError.displayName}
        />
        <InputGroup
          label="Email"
          placeholder="student@email.com"
          style={styles.inputGroup}
          onChangeText={handleInputTextChange('email')}
          error={fieldError.email}
        />
        <InputGroup
          label="Password"
          placeholder="password"
          style={styles.inputGroup}
          onChangeText={handleInputTextChange('password')}
          error={fieldError.password}
          secureTextEntry
        />
      </View>
      <Button onPress={handleRegister} disabled={isProcessing} primary>
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
    color: '#101010',
    marginBottom: 24,
    fontFamily: 'Satoshi-Bold',
  },
  inputGroup: {
    marginTop: 12,
  },
})

export default RegisterScreen
