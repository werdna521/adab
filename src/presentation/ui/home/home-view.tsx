import React from 'react'
import { StyleSheet, View } from 'react-native'

import { Screens, TabScreen } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'

import { CreateGroupBlock, Greeting, TextToSpeechBlock } from './components'

type Props = {}

const HomeView: TabScreen<Props, Screens.HOME> = ({ navigation }) => {
  const navigateToCreateGroup = () => navigation.navigate(Screens.CREATE_GROUP)
  const navigateToTextToSpeech = () =>
    navigation.navigate(Screens.TEXT_TO_SPEECH)

  return (
    <View style={styles.container}>
      <Greeting />
      <CreateGroupBlock navigateToCreateGroup={navigateToCreateGroup} />
      <TextToSpeechBlock navigateToTextToSpeech={navigateToTextToSpeech} />
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

export default HomeView
