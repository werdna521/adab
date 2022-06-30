import React, { FC } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { getColor } from '~/presentation/colors'
import { useTheme } from '~/presentation/theme'

const MicOn: FC = () => {
  const { isLowVisionMode } = useTheme()
  return (
    <Icon name="mic-off" size={24} color={getColor('white', isLowVisionMode)} />
  )
}

export default MicOn
