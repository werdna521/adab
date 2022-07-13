import React from 'react'
import { ScrollView, StyleSheet, TextInput, View } from 'react-native'

import { getColor } from '~/presentation/colors'
import { Screens, TabScreen } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'
import { useTheme } from '~/presentation/theme'

import { Button } from '../common/components'
import { useTextToSpeechViewModel } from './text-to-speech-view-model'

type Props = {}

const TextToSpeechScreen: TabScreen<Props, Screens.HOME> = () => {
  const { isLowVisionMode } = useTheme()

  const { handleInputTextChange } = useTextToSpeechViewModel()

  return (
    <View style={styles(isLowVisionMode).container}>
      <ScrollView
        style={styles(isLowVisionMode).scrollView}
        keyboardDismissMode="interactive"
      >
        <TextInput
          style={styles(isLowVisionMode).content}
          defaultValue=""
          onChangeText={handleInputTextChange('text')}
          placeholder="Enter a text and press the button below to turn into voice"
          placeholderTextColor={getColor('#a0a3ad', isLowVisionMode)}
          multiline
        />
      </ScrollView>
      <Button style={styles(isLowVisionMode).playButton} primary>
        Play
      </Button>
    </View>
  )
}

const styles = (isLowVisionMode: boolean) =>
  StyleSheet.create({
    container: {
      paddingTop: getNotchSize() + 16,
      height: '100%',
    },
    scrollView: {
      marginBottom: 16,
      paddingHorizontal: 20,
    },
    content: {
      fontSize: 16,
      fontFamily: 'Satoshi-Medium',
      color: getColor('#101010', isLowVisionMode),
      padding: 0,
    },
    playButton: {
      marginBottom: 24,
    },
  })

export default TextToSpeechScreen
