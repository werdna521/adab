import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { getColor } from '~/presentation/colors'
import { useTheme } from '~/presentation/theme'

const Greeting: FC = () => {
  const { isLowVisionMode } = useTheme()
  const now = new Date()

  const getPrompt = () => {
    const hour = now.getHours()
    if (hour <= 11) return 'Morning'
    if (hour <= 18) return 'Afternoon'
    if (hour <= 21) return 'Evening'
    if (hour <= 24) return 'Night'
  }

  return (
    <View>
      <Text style={styles(isLowVisionMode).top}>Good</Text>
      <Text style={styles(isLowVisionMode).bottom}>{getPrompt()}</Text>
      <Text style={styles(isLowVisionMode).pleasantries}>
        Have a great day!
      </Text>
    </View>
  )
}

const styles = (isLowVisionMode: boolean) =>
  StyleSheet.create({
    top: {
      fontSize: 32,
      color: getColor('#101010', isLowVisionMode),
      fontFamily: 'Satoshi-Medium',
    },
    bottom: {
      fontSize: 36,
      color: getColor('#101010', isLowVisionMode),
      fontFamily: 'Satoshi-Bold',
      marginTop: -12,
    },
    settings: {
      borderRadius: 16,
      width: 32,
      height: 32,
    },
    pleasantries: {
      fontSize: 16,
      fontFamily: 'Satoshi-Regular',
      color: getColor('#212121', isLowVisionMode),
      marginTop: 16,
    },
  })

export default Greeting
