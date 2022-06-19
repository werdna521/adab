import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import ChangePasswordUseCase from '~/interactor/auth/change-password-use-case'
import { Screen, Screens } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'
import { Button, InputGroup } from '~/presentation/ui/common/components'

import { useChangePasswordViewModel } from './change-password-view-model'

type Props = {
  changePasswordUseCase: ChangePasswordUseCase
}

const ChangePasswordScreen: Screen<Props, Screens.CHANGE_PASSWORD> = ({
  navigation,
  changePasswordUseCase,
}) => {
  const {
    handleInputTextChange,
    handleChangePassword,
    isProcessing,
    globalError,
    fieldError,
  } = useChangePasswordViewModel({
    changePasswordUseCase,
  })

  const navigateToSettings = () => navigation.pop()
  const handleChangePasswordPress = async () => {
    if (await handleChangePassword()) navigateToSettings()
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Change Password</Text>
        <InputGroup
          label="Old Password"
          style={styles.inputGroup}
          placeholder="Old Password"
          onChangeText={handleInputTextChange('oldPassword')}
          error={fieldError.oldPassword}
          secureTextEntry
        />
        <InputGroup
          label="New Password"
          style={styles.inputGroup}
          placeholder="New Password"
          onChangeText={handleInputTextChange('newPassword')}
          error={fieldError.newPassword}
          secureTextEntry
        />
        <InputGroup
          label="Confirm Password"
          style={styles.inputGroup}
          placeholder="Confirm Password"
          onChangeText={handleInputTextChange('newPasswordConfirm')}
          error={fieldError.newPasswordConfirm}
          secureTextEntry
        />
        <Text style={styles.error}>{globalError}</Text>
      </View>
      <Button
        onPress={handleChangePasswordPress}
        disabled={isProcessing}
        primary
      >
        Change Password
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

export default ChangePasswordScreen
