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

  return (
    <TouchableOpacity
      style={[styles(props).container, style]}
      activeOpacity={0.5}
      onPress={navigateToGroup}
    >
      <Text style={styles(props).title}>{group.name}</Text>
      <View style={styles(props).metadataContainer}>
        <View style={styles(props).rowContainer}>
          <Icon name="person" color="#dfdfdf" size={20} />
          <Text style={styles(props).member}>
            {memberCount} {unit}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = ({ index }: Props) =>
  StyleSheet.create({
    container: {
      backgroundColor: COLORS[index % Object.values(COLORS).length],
      padding: 24,
      borderRadius: 24,
    },
    title: {
      fontSize: 16,
      color: '#fdfff1',
      fontFamily: 'Satoshi-Bold',
    },
    member: {
      fontSize: 14,
      color: '#dfdfdf',
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
