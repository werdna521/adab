import React, { FC } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Group } from '~/domain/model'
import { getColor } from '~/presentation/colors'
import { useTheme } from '~/presentation/theme'

type Props = {
  group: Group
  navigateToGroup: () => void
  index: number
  style?: StyleProp<ViewStyle>
}

const COLORS: Record<number, string> = {
  0: '#9bb1fe',
  1: '#b08ee4',
  2: '#f39072',
  3: '#3472df',
}

const GroupItem: FC<Props> = (props) => {
  const { group, navigateToGroup, style } = props
  const memberCount = Object.keys(group.members).length
  const unit = memberCount > 1 ? 'members' : 'member'
  const { isLowVisionMode } = useTheme()

  return (
    <TouchableOpacity
      style={[styles({ ...props, isLowVisionMode }).container, style]}
      activeOpacity={0.5}
      onPress={navigateToGroup}
    >
      <Text style={styles({ ...props, isLowVisionMode }).title}>
        {group.name}
      </Text>
      <View style={styles({ ...props, isLowVisionMode }).metadataContainer}>
        <View style={styles({ ...props, isLowVisionMode }).rowContainer}>
          <Icon
            name="person"
            color={getColor('#dfdfdf', isLowVisionMode)}
            size={20}
          />
          <Text style={styles({ ...props, isLowVisionMode }).member}>
            {memberCount} {unit}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = ({
  index,
  isLowVisionMode,
}: Props & { isLowVisionMode: boolean }) =>
  StyleSheet.create({
    container: {
      backgroundColor: getColor(
        COLORS[index % Object.values(COLORS).length],
        isLowVisionMode,
      ),
      padding: 24,
      borderRadius: 24,
    },
    title: {
      fontSize: 16,
      color: getColor('#fdfff1', isLowVisionMode),
      fontFamily: 'Satoshi-Bold',
    },
    member: {
      fontSize: 14,
      color: getColor('#dfdfdf', isLowVisionMode),
      fontFamily: 'Satoshi-Medium',
      marginLeft: 6,
    },
    metadataContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  })

export default GroupItem
