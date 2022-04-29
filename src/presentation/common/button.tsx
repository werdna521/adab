import React, { FC } from 'react'
import { Text, TouchableOpacity } from 'react-native'

type Props = {
  onPress?: () => void
}

const Button: FC<Props> = ({ onPress = () => {}, children }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        paddingVertical: 20,
        paddingHorizontal: 32,
        minWidth: 200,
        backgroundColor: '#2d2d2d',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 24,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: '600',
          color: 'white',
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  )
}

export default Button
