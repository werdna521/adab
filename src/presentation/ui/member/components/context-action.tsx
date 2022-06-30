import React, { FC } from 'react'
import { StyleSheet, Text } from 'react-native'

import { getColor } from '~/presentation/colors'
import { useTheme } from '~/presentation/theme'

const ContextAction: FC = ({ children }) => {
  const { isLowVisionMode } = useTheme()
  return <Text style={styles(isLowVisionMode).text}>{children}</Text>
}

const styles = (isLowVisionMode: boolean) =>
  StyleSheet.create({
    text: {
      color: getColor('#535250', isLowVisionMode),
      fontSize: 14,
      fontWeight: '500',
    },
  })

export default ContextAction
