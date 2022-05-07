import React, { FC } from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'

type Props = {
  style?: StyleProp<ViewStyle>
}

const GroupItem: FC<Props> = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>Mobile Application</Text>
      <Text style={styles.member}>8 people</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fbf1a3',
    padding: 24,
    borderRadius: 24,
  },
  title: {
    fontSize: 18,
    color: '#1d2d48',
    fontWeight: '600',
  },
  member: {
    fontSize: 14,
    color: '#979053',
    fontWeight: '600',
    marginTop: 4,
  },
})

export default GroupItem
