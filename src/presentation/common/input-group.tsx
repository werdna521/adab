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
}

const InputGroup: FC<Props> = ({
  label = '',
  style = {},
  secureTextEntry = false,
}) => {
  return (
    <View style={style}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput style={styles.input} secureTextEntry={secureTextEntry} />
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: '#b7b6bd',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 4,
  },
})

export default InputGroup
