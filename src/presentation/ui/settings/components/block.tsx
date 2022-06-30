import React, { FC } from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'

import { getColor } from '~/presentation/colors'
import { useTheme } from '~/presentation/theme'

type Variant = 'primary' | 'secondary' | 'tertiary' | 'quarternary'

type Props = {
  variant: Variant
  text: string
  source: ImageSourcePropType
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

const COLORS: Record<Variant, string> = {
  primary: '#f39072',
  secondary: '#9bb1fe',
  tertiary: '#b08ee4',
  quarternary: '#3472df',
}

const Block: FC<Props> = (props) => {
  const { text, source, style, onPress } = props
  const { isLowVisionMode } = useTheme()

  return (
    <TouchableOpacity
      style={[styles({ ...props, isLowVisionMode }).container, style]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={styles({ ...props, isLowVisionMode }).title}>{text}</Text>
      <Image
        style={styles({ ...props, isLowVisionMode }).illustration}
        source={source}
      />
    </TouchableOpacity>
  )
}

const styles = ({
  variant,
  isLowVisionMode,
}: Props & { isLowVisionMode: boolean }) =>
  StyleSheet.create({
    container: {
      backgroundColor: getColor(COLORS[variant], isLowVisionMode),
      paddingHorizontal: 24,
      paddingVertical: 18,
      borderRadius: 12,
      width: '47.5%',
    },
    title: {
      color: getColor('#fdfff1', isLowVisionMode),
      fontFamily: 'Satoshi-Bold',
      fontSize: 14,
    },
    illustration: {
      aspectRatio: 1 / 1,
      width: '80%',
      height: undefined,
      alignSelf: 'center',
      marginTop: 12,
    },
  })

export default Block
