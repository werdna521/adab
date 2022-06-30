import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { getColor } from '~/presentation/colors'
import { useTheme } from '~/presentation/theme'

const Title: FC = () => {
  const { isLowVisionMode } = useTheme()

  return (
    <View>
      <Text style={styles(isLowVisionMode).top}>New</Text>
      <Text style={styles(isLowVisionMode).bottom}>Group</Text>
    </View>
  )
}

const styles = (isLowVisionMode: boolean) =>
  StyleSheet.create({
    top: {
      fontSize: 24,
      color: getColor('#1d2d48', isLowVisionMode),
      fontWeight: '500',
    },
    bottom: {
      fontSize: 32,
      color: getColor('#1d2d48', isLowVisionMode),
      fontWeight: '600',
    },
  })

export default Title
