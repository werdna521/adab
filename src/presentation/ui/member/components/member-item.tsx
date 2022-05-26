import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Role } from '~/domain/model/group'

import Avatar from './avatar'

type Props = {
  name: string
  role: Role
}

const MemberItem: FC<Props> = ({ name, role }) => {
  return (
    <View style={styles.container}>
      <Avatar name={name} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>
          {role.charAt(0).toUpperCase()}
          {role.slice(1)}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 16,
  },
  name: {
    color: '#535250',
    fontWeight: '600',
    fontSize: 18,
  },
  role: {
    fontSize: 14,
    color: '#979053',
    fontWeight: '600',
  },
})

export default MemberItem
