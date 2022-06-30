import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { getColor } from '~/presentation/colors'
import { useTheme } from '~/presentation/theme'

type Props = {
  name: string
}

const Avatar: FC<Props> = ({ name }) => {
  const { isLowVisionMode } = useTheme()
  const initials = name
    ?.split(' ')
    .map((char) => char.charAt(0)?.toUpperCase())
    .slice(0, 2)
    .join('')

  return (
    <View style={styles(isLowVisionMode).container}>
      <Text style={styles(isLowVisionMode).initials}>{initials}</Text>
    </View>
  )
}

const styles = (isLowVisionMode: boolean) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 48,
      height: 48,
      borderRadius: 32,
      backgroundColor: getColor('#46b2ff', isLowVisionMode),
    },
    initials: {
      color: getColor('white', isLowVisionMode),
      fontSize: 16,
      fontWeight: '700',
    },
  })

export default Avatar
