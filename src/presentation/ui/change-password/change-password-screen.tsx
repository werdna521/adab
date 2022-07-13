import React from 'react'
import { StyleSheet, Text, ToastAndroid, View } from 'react-native'

import ChangePasswordUseCase from '~/interactor/auth/change-password-use-case'
import { getColor } from '~/presentation/colors'
import { Screen, Screens } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'
import { useTheme } from '~/presentation/theme'
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
  const { isLowVisionMode } = useTheme()

  const navigateToSettings = () => navigation.pop()
  const handleChangePasswordPress = async () => {
    if (await handleChangePassword()) {
      ToastAndroid.show('Password Changed', ToastAndroid.SHORT)
      navigateToSettings()
    }
  }

  return (
    <View style={styles(isLowVisionMode).container}>
      <View>
        <Text style={styles(isLowVisionMode).title}>Change Password</Text>
        <InputGroup
          label="Old Password"
          style={styles(isLowVisionMode).inputGroup}
          placeholder="Old Password"
          onChangeText={handleInputTextChange('oldPassword')}
          error={fieldError.oldPassword}
          secureTextEntry
        />
        <InputGroup
          label="New Password"
          style={styles(isLowVisionMode).inputGroup}
          placeholder="New Password"
          onChangeText={handleInputTextChange('newPassword')}
          error={fieldError.newPassword}
          secureTextEntry
        />
        <InputGroup
          label="Confirm Password"
          style={styles(isLowVisionMode).inputGroup}
          placeholder="Confirm Password"
          onChangeText={handleInputTextChange('newPasswordConfirm')}
          error={fieldError.newPasswordConfirm}
          secureTextEntry
        />
        <Text style={styles(isLowVisionMode).error}>{globalError}</Text>
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

const styles = (isLowVisionMode: boolean) =>
  StyleSheet.create({
    container: {
      paddingTop: getNotchSize() + 40,
      paddingBottom: 48,
      paddingHorizontal: 20,
      justifyContent: 'space-between',
      height: '100%',
    },
    title: {
      fontSize: 28,
      color: getColor('#101010', isLowVisionMode),
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
      color: getColor('#fe6b4d', isLowVisionMode),
      marginTop: 24,
    },
  })

export default ChangePasswordScreen
