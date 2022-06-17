import React from 'react'
import { StyleSheet, View } from 'react-native'

import { Screens, TabScreen } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'

import { CreateGroupBlock, Greeting } from './components'

type Props = {}

const HomeScreen: TabScreen<Props, Screens.HOME> = ({ navigation }) => {
  const navigateToCreateGroup = () => navigation.navigate(Screens.CREATE_GROUP)

  return (
    <View style={styles.container}>
      <Greeting />
      <CreateGroupBlock navigateToCreateGroup={navigateToCreateGroup} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: getNotchSize() + 16,
    paddingHorizontal: 20,
    height: '100%',
  },
})

export default HomeScreen
