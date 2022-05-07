import React, { FC } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'

type Props = {
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

const TextButton: FC<Props> = ({ children, style, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  text: {
    color: '#1d2d48',
  },
})

export default TextButton
