import React, { FC } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'

type Props = {
  style?: StyleProp<ViewStyle>
  onPress?: () => void
  color?: string
  textStyle?: StyleProp<TextStyle>
  disabled?: boolean
}

const TextButton: FC<Props> = (props) => {
  const { children, style, onPress, textStyle, disabled } = props

  return (
    <TouchableOpacity
      style={[styles(props).container, style]}
      activeOpacity={0.9}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles(props).text, textStyle]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = ({ color = '#1d2d48', disabled }: Props) =>
  StyleSheet.create({
    container: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      opacity: disabled ? 0.7 : 1,
    },
    text: {
      color,
      fontFamily: 'Satoshi-Medium',
    },
  })

export default TextButton
