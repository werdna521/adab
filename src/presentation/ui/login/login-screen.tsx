import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import LoginUseCase from '~/interactor/auth/login-use-case'
import { Screen, Screens } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'
import { Button, InputGroup } from '~/presentation/ui/common/components'

import { useLoginViewModel } from './login-view-model'

type Props = {
  loginUseCase: LoginUseCase
}

const LoginScreen: Screen<Props, Screens.LOGIN> = ({ loginUseCase }) => {
  const {
    handleInputTextChange,
    handleLogin,
    fieldError,
    globalError,
    isProcessing,
  } = useLoginViewModel({
    loginUseCase,
  })

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Login</Text>
        <InputGroup
          label="Email"
          style={styles.inputGroup}
          onChangeText={handleInputTextChange('email')}
          error={fieldError.email}
        />
        <InputGroup
          label="Password"
          style={styles.inputGroup}
          onChangeText={handleInputTextChange('password')}
          error={fieldError.password}
          secureTextEntry
        />
        {globalError ? <Text style={styles.error}>{globalError}</Text> : null}
      </View>
      <Button onPress={handleLogin} disabled={isProcessing}>
        Login
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
  error: {
    color: '#fe6b4d',
    marginTop: 24,
  },
})

export default LoginScreen
