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
}

const TextButton: FC<Props> = (props) => {
  const { children, style, onPress, textStyle } = props

  return (
    <TouchableOpacity
      style={[styles(props).container, style]}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <Text style={[styles(props).text, textStyle]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = ({ color = '#1d2d48' }: Props) =>
  StyleSheet.create({
    container: {
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    text: {
      color,
      fontFamily: 'Satoshi-Medium',
    },
  })

export default TextButton
