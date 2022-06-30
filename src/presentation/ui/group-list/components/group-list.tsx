import React, { FC } from 'react'
import {
  DefaultSectionT,
  SectionList,
  SectionListData,
  SectionListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { Group } from '~/domain/model'
import { getColor } from '~/presentation/colors'
import { getNotchSize } from '~/presentation/notch'
import { useTheme } from '~/presentation/theme'

import GroupItem from './group-item'

type Props = {
  groupList: SectionListData<Group, DefaultSectionT>[]
  onRefresh: () => void
  navigateToGroup: (group: Group) => void
  isRefreshing: boolean
}

const GroupList: FC<Props> = ({
  groupList,
  onRefresh,
  navigateToGroup,
  isRefreshing,
}) => {
  const { isLowVisionMode } = useTheme()
  const renderGroupItem: SectionListRenderItem<Group> = ({
    item: group,
    index,
  }) => {
    const handleNavigateToGroup = () => navigateToGroup(group)
    return (
      <GroupItem
        index={index}
        navigateToGroup={handleNavigateToGroup}
        group={group}
      />
    )
  }
  const renderGroupLabel = ({ section: { title } }: any) => {
    return <Text style={styles(isLowVisionMode).label}>{title}</Text>
  }
  const renderHeader = () => (
    <Text style={styles(isLowVisionMode).title}>Your Groups</Text>
  )
  const renderSeparator = () => (
    <View style={styles(isLowVisionMode).separator} />
  )
  const renderSectionSeparator = () => (
    <View style={styles(isLowVisionMode).sectionSeparator} />
  )
  const renderEmpty = () => (
    <Text style={styles(isLowVisionMode).empty}>No group yet.</Text>
  )

  return (
    <SectionList
      contentContainerStyle={styles(isLowVisionMode).container}
      showsVerticalScrollIndicator={false}
      sections={groupList}
      renderItem={renderGroupItem}
      renderSectionHeader={renderGroupLabel}
      renderSectionFooter={renderSectionSeparator}
      keyExtractor={(group) => `group-item-${group.uid}`}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      ItemSeparatorComponent={renderSeparator}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={View}
      ListFooterComponentStyle={styles(isLowVisionMode).footer}
      ListEmptyComponent={renderEmpty}
    />
  )
}

const styles = (isLowVisionMode: boolean) =>
  StyleSheet.create({
    container: {
      paddingTop: getNotchSize() + 16,
      paddingHorizontal: 20,
    },
    separator: {
      marginTop: 12,
    },
    sectionSeparator: {
      marginTop: 24,
    },
    title: {
      fontSize: 24,
      fontFamily: 'Satoshi-Bold',
      color: getColor('#101010', isLowVisionMode),
      marginBottom: 48,
    },
    footer: {
      height: 40,
    },
    empty: {
      fontSize: 14,
      color: getColor('#101010', isLowVisionMode),
      fontFamily: 'Satoshi-Medium',
    },
    label: {
      color: getColor('#101010', isLowVisionMode),
      fontFamily: 'Satoshi-Medium',
      fontSize: 14,
      marginBottom: 8,
      marginLeft: 8,
    },
  })

export default GroupList
