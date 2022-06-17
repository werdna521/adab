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
    return <Text style={styles.label}>{title}</Text>
  }
  const renderHeader = () => <Text style={styles.title}>Your Groups</Text>
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
  title: {
    fontSize: 24,
    fontFamily: 'Satoshi-Bold',
    color: '#101010',
    marginBottom: 48,
  },
  footer: {
    height: 40,
  },
  empty: {
    fontSize: 14,
    color: '#101010',
    fontFamily: 'Satoshi-Medium',
  },
  label: {
    color: '#101010',
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 8,
  },
})

export default GroupList
