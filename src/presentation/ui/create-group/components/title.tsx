import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Title: FC = () => {
  return (
    <View>
      <Text style={styles.top}>New</Text>
      <Text style={styles.bottom}>Group</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  top: {
    fontSize: 24,
    color: '#1d2d48',
    fontWeight: '500',
  },
  bottom: {
    fontSize: 32,
    color: '#1d2d48',
    fontWeight: '600',
  },
})

export default Title
