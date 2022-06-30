import React, { FC } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'

import { getColor } from '~/presentation/colors'
import { useTheme } from '~/presentation/theme'

type Props = {
  onPress?: () => void
  disabled?: boolean
  style?: StyleProp<ViewStyle>
  primary?: boolean
  minWidth?: number
}

const Button: FC<Props> = (props) => {
  const { onPress = () => {}, disabled = false, children } = props
  const { isLowVisionMode } = useTheme()

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[props.style, styles({ ...props, isLowVisionMode }).container]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles({ ...props, isLowVisionMode }).text}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = ({
  disabled = false,
  primary = false,
  minWidth,
  isLowVisionMode,
}: Props & { isLowVisionMode: boolean }) =>
  StyleSheet.create({
    container: {
      paddingVertical: 16,
      paddingHorizontal: 32,
      minWidth: minWidth !== undefined ? minWidth : 200,
      backgroundColor: getColor(
        primary ? '#3472df' : '#2d2d2d',
        isLowVisionMode,
      ),
      opacity: disabled ? 0.5 : 1,
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 12,
    },
    text: {
      fontSize: 18,
      color: getColor('white', isLowVisionMode),
      fontFamily: 'Satoshi-Medium',
    },
  })

export default Button
