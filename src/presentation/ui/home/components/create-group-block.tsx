import React, { FC } from 'react'
import { Image, StyleSheet, TouchableOpacity, Text } from 'react-native'

import { getColor } from '~/presentation/colors'
import { useTheme } from '~/presentation/theme'

type Props = {
  navigateToCreateGroup: () => void
}

const CreateGroupBlock: FC<Props> = ({ navigateToCreateGroup }) => {
  const { isLowVisionMode } = useTheme()
  return (
    <TouchableOpacity
      style={styles(isLowVisionMode).container}
      onPress={navigateToCreateGroup}
      activeOpacity={0.8}
    >
      <Text style={styles(isLowVisionMode).title}>+ Create Group</Text>
      <Text style={styles(isLowVisionMode).description}>
        Create a Group to start a meeting/session
      </Text>
      <Image
        source={require('~/assets/illustrations/barista.png')}
        style={styles(isLowVisionMode).illustration}
      />
    </TouchableOpacity>
  )
}

const styles = (isLowVisionMode: boolean) =>
  StyleSheet.create({
    container: {
      marginTop: 12,
      backgroundColor: getColor('#f39072', isLowVisionMode),
      paddingHorizontal: 24,
      paddingVertical: 18,
      borderRadius: 12,
      minHeight: 180,
    },
    title: {
      color: getColor('#fdfff1', isLowVisionMode),
      fontFamily: 'Satoshi-Bold',
      fontSize: 16,
    },
    description: {
      color: getColor('#fdfff1', isLowVisionMode),
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
