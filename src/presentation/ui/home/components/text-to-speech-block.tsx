import React, { FC } from 'react'
import { Image, StyleSheet, TouchableOpacity, Text } from 'react-native'

import { getColor } from '~/presentation/colors'
import { useTheme } from '~/presentation/theme'

type Props = {
  navigateToTextToSpeech: () => void
}

const TextToSpeechBlock: FC<Props> = ({ navigateToTextToSpeech }) => {
  const { isLowVisionMode } = useTheme()
  return (
    <TouchableOpacity
      style={styles(isLowVisionMode).container}
      onPress={navigateToTextToSpeech}
      activeOpacity={0.8}
    >
      <Text style={styles(isLowVisionMode).title}>Text-to-speech</Text>
      <Text style={styles(isLowVisionMode).description}>
        Start a text-to-speech session
      </Text>
      <Image
        source={require('~/assets/illustrations/barista.png')}
        style={styles(isLowVisionMode).illustration}
      />
    </TouchableOpacity>
  )
}

const styles = (isLowVisionMode: boolean) =>
  StyleSheet.create({
    container: {
      marginTop: 12,
      backgroundColor: getColor('#9bb1fe', isLowVisionMode),
      paddingHorizontal: 24,
      paddingVertical: 18,
      borderRadius: 12,
      minHeight: 180,
      alignItems: 'flex-end',
    },
    title: {
      color: getColor('#fdfff1', isLowVisionMode),
      fontFamily: 'Satoshi-Bold',
      fontSize: 16,
    },
    description: {
      color: getColor('#fdfff1', isLowVisionMode),
      fontFamily: 'Satoshi-Medium',
      fontSize: 14,
      maxWidth: 170,
      marginTop: 8,
      textAlign: 'right',
    },
    illustration: {
      aspectRatio: 534 / 468,
      width: undefined,
      height: 160,
      position: 'absolute',
      bottom: 0,
      left: -16,
    },
  })

export default TextToSpeechBlock
