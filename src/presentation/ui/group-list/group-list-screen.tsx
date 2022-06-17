import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

import { Group } from '~/domain/model'
import GetGroupListUseCase from '~/interactor/group/get-group-list-use-case'
import { Screens, TabScreen } from '~/presentation/navigation'

import { GroupList } from './components'
import { useGroupListViewModel } from './group-list-view-model'

type Props = {
  getGroupListUseCase: GetGroupListUseCase
}

const GroupListScreen: TabScreen<Props, Screens.GROUP_LIST> = ({
  navigation,
  user,
  getGroupListUseCase,
}) => {
  const { groupList, isProcessing, loadGroupList } = useGroupListViewModel({
    getGroupListUseCase,
    user: user!,
  })

  useEffect(() => {
    loadGroupList()
  }, [loadGroupList])

  const navigateToGroup = (group: Group) =>
    navigation.navigate(Screens.GROUP, {
      groupID: group.uid,
    })

  return (
    <View style={styles.container}>
      <GroupList
        isRefreshing={isProcessing}
        groupList={groupList}
        onRefresh={loadGroupList}
        navigateToGroup={navigateToGroup}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
})

export default GroupListScreen
