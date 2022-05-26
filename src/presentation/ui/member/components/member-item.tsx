import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Avatar from './avatar'

type Props = {
  name: string
}

const MemberItem: FC<Props> = ({ name }) => {
  return (
    <View style={styles.container}>
      <Avatar name={name} />
      <Text style={styles.name}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: '#535250',
    fontWeight: '600',
    fontSize: 18,
    marginLeft: 16,
  },
})

export default MemberItem
