import React, { FC } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native'

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
  return (
    <View style={style}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#a0a3ad"
        value={value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: '#101010',
    fontFamily: 'Satoshi-Medium',
    fontWeight: '600',
  },
  error: {
    fontSize: 14,
    color: '#fe6b4d',
    fontFamily: 'Satoshi-Medium',
  },
  input: {
    backgroundColor: '#ffffff',
    color: '#101010',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 2,
    fontFamily: 'Satoshi-Medium',
    borderWidth: 1,
    borderColor: '#dfdfdf',
  },
})

export default InputGroup
