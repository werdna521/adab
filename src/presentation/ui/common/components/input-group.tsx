import React, { FC } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native'

import { getColor } from '~/presentation/colors'
import { useTheme } from '~/presentation/theme'

type Props = {
  label?: string
  style?: StyleProp<ViewStyle>
  secureTextEntry?: boolean
  onChangeText?: (text: string) => void
  error?: string
  placeholder?: string
  value?: string
}

const InputGroup: FC<Props> = ({
  label = '',
  style = {},
  secureTextEntry = false,
  onChangeText = () => {},
  error = '',
  placeholder = '',
  value,
}) => {
  const { isLowVisionMode } = useTheme()

  return (
    <View style={style}>
      {label ? (
        <Text style={styles(isLowVisionMode).label}>{label}</Text>
      ) : null}
      {error ? (
        <Text style={styles(isLowVisionMode).error}>{error}</Text>
      ) : null}
      <TextInput
        style={styles(isLowVisionMode).input}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={getColor('#a0a3ad', isLowVisionMode)}
        value={value}
      />
    </View>
  )
}

const styles = (isLowVisionMode: boolean) =>
  StyleSheet.create({
    label: {
      fontSize: 14,
      color: getColor('#101010', isLowVisionMode),
      fontFamily: 'Satoshi-Medium',
      fontWeight: '600',
    },
    error: {
      fontSize: 14,
      color: getColor('#fe6b4d', isLowVisionMode),
      fontFamily: 'Satoshi-Medium',
    },
    input: {
      backgroundColor: getColor('#ffffff', isLowVisionMode),
      color: getColor('#101010', isLowVisionMode),
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      marginTop: 2,
      fontFamily: 'Satoshi-Medium',
      borderWidth: 1,
      borderColor: getColor('#dfdfdf', isLowVisionMode),
    },
  })

export default InputGroup
