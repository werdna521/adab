import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import LogOutUseCase from '~/interactor/auth/logout-use-case'
import { getColor } from '~/presentation/colors'
import { Screens, TabScreen } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'
import { useTheme } from '~/presentation/theme'

import { TextButton } from '../common/components'
import { Block } from './components'
import { useSettingsViewModel } from './settings-view-model'

type Props = {
  logOutUseCase: LogOutUseCase
}

const SettingsScreen: TabScreen<Props, Screens.SETTINGS> = ({
  logOutUseCase,
  navigation,
}) => {
  const { isProcessing, handleLogOut, handleLowVisionModeToggle } =
    useSettingsViewModel({
      logOutUseCase,
    })
  const { isLowVisionMode } = useTheme()

  const navigateToChangePassword = () =>
    navigation.navigate(Screens.CHANGE_PASSWORD)
  const navigateToChangeName = () => navigation.navigate(Screens.CHANGE_NAME)

  return (
    <View style={styles(isLowVisionMode).container}>
      <Text style={styles(isLowVisionMode).title}>Settings</Text>
      <View style={styles(isLowVisionMode).gridContainer}>
        <Block
          text="Change password"
          variant="primary"
          source={require('~/assets/illustrations/fingerprint.png')}
          onPress={navigateToChangePassword}
        />
        <Block
          text="Change display name"
          variant="secondary"
          source={require('~/assets/illustrations/phone.png')}
          onPress={navigateToChangeName}
        />
        <Block
          style={styles(isLowVisionMode).margin}
          text="Toggle color scheme"
          variant="tertiary"
          source={require('~/assets/illustrations/ice-cream.png')}
          onPress={handleLowVisionModeToggle}
        />
      </View>
      <TextButton
        style={styles(isLowVisionMode).logoutButton}
        color="#F32013"
        onPress={handleLogOut}
        disabled={isProcessing}
      >
        Log Out
      </TextButton>
    </View>
  )
}

const styles = (isLowVisionMode: boolean) =>
  StyleSheet.create({
    container: {
      height: '100%',
      paddingTop: getNotchSize() + 16,
      paddingHorizontal: 20,
    },
    gridContainer: {
      marginTop: 16,
      flexGrow: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      color: getColor('#101010', isLowVisionMode),
      fontFamily: 'Satoshi-Bold',
    },
    logoutButton: {
      alignSelf: 'center',
      marginBottom: 24,
    },
    margin: {
      marginTop: 16,
    },
  })

export default SettingsScreen
