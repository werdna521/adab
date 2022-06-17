import React, { FC } from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'

type Props = {
  navigateToCreateGroup: () => void
}

const CreateGroupBlock: FC<Props> = ({ navigateToCreateGroup }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={navigateToCreateGroup}
      activeOpacity={0.8}
    >
      <Text style={styles.title}>+ Create Group</Text>
      <Text style={styles.description}>
        Create a Group to start a meeting/session
      </Text>
      <Image
        source={require('~/assets/illustrations/barista.png')}
        style={styles.illustration}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    backgroundColor: '#f39072',
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderRadius: 12,
    minHeight: 180,
  },
  title: {
    color: '#fdfff1',
    fontFamily: 'Satoshi-Bold',
    fontSize: 16,
  },
  description: {
    color: '#fdfff1',
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
    maxWidth: 170,
    marginTop: 8,
  },
  illustration: {
    aspectRatio: 534 / 468,
    width: undefined,
    height: 160,
    position: 'absolute',
    bottom: 0,
    right: -16,
  },
})

export default CreateGroupBlock
