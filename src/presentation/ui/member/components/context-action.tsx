import React, { FC } from 'react'
import { StyleSheet, Text } from 'react-native'

const ContextAction: FC = ({ children }) => {
  return <Text style={styles.text}>{children}</Text>
}

const styles = StyleSheet.create({
  text: {
    color: '#535250',
    fontSize: 14,
    fontWeight: '500',
  },
})

export default ContextAction
