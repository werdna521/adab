import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { getColor } from '~/presentation/colors'
import { useTheme } from '~/presentation/theme'

type Props = {
  navigateToCreate: () => void
}

const CreateFAB: FC<Props> = ({ navigateToCreate }) => {
  const { isLowVisionMode } = useTheme()

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles(isLowVisionMode).container}
      onPress={navigateToCreate}
    >
      <Icon name="add" size={40} color="white" />
    </TouchableOpacity>
  )
}

const styles = (isLowVisionMode: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: getColor('#2d2d2d', isLowVisionMode),
      width: 64,
      height: 64,
      borderRadius: 200,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 24,
      right: 24,
      elevation: 10,
    },
  })

export default CreateFAB
