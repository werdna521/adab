import React, { FC } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'

type Props = {
  onPress?: () => void
  disabled?: boolean
  style?: StyleProp<ViewStyle>
  primary?: boolean
  minWidth?: number
}

const Button: FC<Props> = (props) => {
  const { onPress = () => {}, disabled = false, children } = props

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[props.style, styles(props).container]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles(props).text}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = ({ disabled = false, primary = false, minWidth }: Props) =>
  StyleSheet.create({
    container: {
      paddingVertical: 20,
      paddingHorizontal: 32,
      minWidth: minWidth !== undefined ? minWidth : 200,
      backgroundColor: primary ? '#b3ddc6' : '#2d2d2d',
      opacity: disabled ? 0.5 : 1,
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 24,
    },
    text: {
      fontSize: 18,
      fontWeight: '600',
      color: primary ? '#2c2c2c' : 'white',
    },
  })

export default Button
