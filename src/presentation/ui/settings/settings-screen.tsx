import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import LogOutUseCase from '~/interactor/auth/logout-use-case'
import { Screens, TabScreen } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'

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
  const { isProcessing, handleLogOut } = useSettingsViewModel({
    logOutUseCase,
  })

  const navigateToChangePassword = () =>
    navigation.navigate(Screens.CHANGE_PASSWORD)
  const navigateToChangeName = () => navigation.navigate(Screens.CHANGE_NAME)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.gridContainer}>
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
          style={styles.margin}
          text="Toggle color scheme"
          variant="tertiary"
          source={require('~/assets/illustrations/ice-cream.png')}
        />
      </View>
      <TextButton
        style={styles.logoutButton}
        color="#F32013"
        onPress={handleLogOut}
        disabled={isProcessing}
      >
        Log Out
      </TextButton>
    </View>
  )
}

const styles = StyleSheet.create({
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
    color: '#101010',
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
