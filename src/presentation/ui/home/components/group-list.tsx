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
import { getNotchSize } from '~/presentation/notch'

import Greeting from './greeting'
import GroupItem from './group-item'

type Props = {
  groupList: SectionListData<Group, DefaultSectionT>[]
  displayName: string
  onRefresh: () => void
  navigateToGroup: (group: Group) => void
  navigateToSettings: () => void
  isRefreshing: boolean
}

const GroupList: FC<Props> = ({
  groupList,
  displayName,
  onRefresh,
  navigateToGroup,
  navigateToSettings,
  isRefreshing,
}) => {
  const renderGroupItem: SectionListRenderItem<Group> = ({ item: group }) => {
    const handleNavigateToGroup = () => navigateToGroup(group)
    return <GroupItem navigateToGroup={handleNavigateToGroup} group={group} />
  }
  const renderGroupLabel = ({ section: { title } }: any) => {
    return <Text style={styles.label}>{title}</Text>
  }
  const renderHeader = () => (
    <Greeting
      navigateToSettings={navigateToSettings}
      displayName={displayName}
    />
  )
  const renderSeparator = () => <View style={styles.separator} />
  const renderSectionSeparator = () => <View style={styles.sectionSeparator} />
  const renderEmpty = () => <Text style={styles.empty}>No group yet.</Text>

  return (
    <SectionList
      contentContainerStyle={styles.container}
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
      ListFooterComponentStyle={styles.footer}
      ListEmptyComponent={renderEmpty}
    />
  )
}

const styles = StyleSheet.create({
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
  footer: {
    height: 120,
  },
  empty: {
    fontSize: 16,
    color: '#1d2d48',
  },
  label: {
    color: '#a4a4a4',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 8,
  },
})

export default GroupList
