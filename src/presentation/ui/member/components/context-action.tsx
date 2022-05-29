import React, { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const ContextAction: FC = ({ children }) => {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    color: '#535250',
    fontSize: 14,
    fontWeight: '500',
  },
})

export default ContextAction
