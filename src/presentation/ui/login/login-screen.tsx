import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import LoginUseCase from '~/interactor/auth/login-use-case'
import ValidateLoginDTOUseCase from '~/interactor/validation/validate-login-dto-use-case'
import { Screen, Screens } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'
import {
  Button,
  InputGroup,
  TextButton,
} from '~/presentation/ui/common/components'

import { useLoginViewModel } from './login-view-model'

type Props = {
  loginUseCase: LoginUseCase
  validateLoginDTOUseCase: ValidateLoginDTOUseCase
}

const LoginScreen: Screen<Props, Screens.LOGIN> = ({
  loginUseCase,
  validateLoginDTOUseCase,
  navigation,
}) => {
  const {
    handleInputTextChange,
    handleLogin,
    fieldError,
    globalError,
    isProcessing,
  } = useLoginViewModel({
    loginUseCase,
    validateLoginDTOUseCase,
  })

  const navigateToSignUp = () => navigation.navigate(Screens.REGISTER)

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Login</Text>
        <InputGroup
          label="Email"
          style={styles.inputGroup}
          placeholder="student@email.com"
          onChangeText={handleInputTextChange('email')}
          error={fieldError.email}
        />
        <InputGroup
          label="Password"
          style={styles.inputGroup}
          placeholder="password"
          onChangeText={handleInputTextChange('password')}
          error={fieldError.password}
          secureTextEntry
        />
        {globalError ? <Text style={styles.error}>{globalError}</Text> : null}
      </View>
      <Button onPress={handleLogin} disabled={isProcessing} primary>
        Login
      </Button>
      <TextButton style={styles.signUpButton} onPress={navigateToSignUp}>
        Sign Up
      </TextButton>
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
  signUpButton: {
    position: 'absolute',
    top: 52,
    right: 20,
    marginTop: 16,
  },
  error: {
    color: '#fe6b4d',
    marginTop: 24,
  },
})

export default LoginScreen
