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
}

const InputGroup: FC<Props> = ({
  label = '',
  style = {},
  secureTextEntry = false,
  onChangeText = () => {},
  error = '',
}) => {
  return (
    <View style={style}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: '#b7b6bd',
    fontWeight: '600',
  },
  error: {
    fontSize: 14,
    color: '#fe6b4d',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#ffffff',
    color: '#1d2d48',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 4,
  },
})

export default InputGroup
