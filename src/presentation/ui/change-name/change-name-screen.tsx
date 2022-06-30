import React from 'react'
import { StyleSheet, Text, ToastAndroid, View } from 'react-native'

import ChangeNameUseCase from '~/interactor/auth/change-name-use-case'
import { getColor } from '~/presentation/colors'
import { Screen, Screens } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'
import { useTheme } from '~/presentation/theme'
import { Button, InputGroup } from '~/presentation/ui/common/components'

import { useChangeNameViewModel } from './change-name-view-model'

type Props = {
  changeNameUseCase: ChangeNameUseCase
}

const ChangeNameScreen: Screen<Props, Screens.CHANGE_NAME> = ({
  navigation,
  changeNameUseCase,
}) => {
  const {
    handleInputTextChange,
    handleChangeName,
    isProcessing,
    globalError,
    fieldError,
  } = useChangeNameViewModel({
    changeNameUseCase,
  })
  const { isLowVisionMode } = useTheme()

  const navigateToSettings = () => navigation.pop()
  const handleChangeNamePress = async () => {
    if (await handleChangeName()) {
      ToastAndroid.show('Group Created', ToastAndroid.SHORT)
      navigateToSettings()
    }
  }

  return (
    <View style={styles(isLowVisionMode).container}>
      <View>
        <Text style={styles(isLowVisionMode).title}>Change Display Name</Text>
        <InputGroup
          label="Display Name"
          style={styles(isLowVisionMode).inputGroup}
          placeholder="John Doe"
          onChangeText={handleInputTextChange('displayName')}
          error={fieldError.displayName}
        />
        <Text style={styles(isLowVisionMode).error}>{globalError}</Text>
      </View>
      <Button onPress={handleChangeNamePress} disabled={isProcessing} primary>
        Update Name
      </Button>
    </View>
  )
}

const styles = (isLowVision: boolean) =>
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
      color: getColor('#101010', isLowVision),
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
      color: getColor('#fe6b4d', isLowVision),
      marginTop: 24,
    },
  })

export default ChangeNameScreen
