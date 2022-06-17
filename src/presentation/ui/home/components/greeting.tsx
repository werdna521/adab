import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Greeting: FC = () => {
  const now = new Date()

  const getPrompt = () => {
    const hour = now.getHours()
    if (hour <= 11) return 'Morning'
    if (hour <= 18) return 'Afternoon'
    if (hour <= 21) return 'Evening'
    if (hour <= 24) return 'Night'
  }

  return (
    <View>
      <Text style={styles.top}>Good</Text>
      <Text style={styles.bottom}>{getPrompt()}</Text>
      <Text style={styles.pleasantries}>Have a great day!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  top: {
    fontSize: 32,
    color: '#101010',
    fontFamily: 'Satoshi-Medium',
  },
  bottom: {
    fontSize: 36,
    color: '#101010',
    fontFamily: 'Satoshi-Bold',
    marginTop: -12,
  },
  settings: {
    borderRadius: 16,
    width: 32,
    height: 32,
  },
  pleasantries: {
    fontSize: 16,
    fontFamily: 'Satoshi-Regular',
    color: '#212121',
    marginTop: 16,
  },
})

export default Greeting
