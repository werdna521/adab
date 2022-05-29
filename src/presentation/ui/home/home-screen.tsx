import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

import { Group } from '~/domain/model'
import GetGroupListUseCase from '~/interactor/group/get-group-list-use-case'
import { Screen, Screens } from '~/presentation/navigation'

import { CreateFAB } from '../common/components'
import { GroupList } from './components'
import { useHomeViewModel } from './home-view-model'

type Props = {
  getGroupListUseCase: GetGroupListUseCase
}

const HomeScreen: Screen<Props, Screens.HOME> = ({
  user,
  navigation,
  getGroupListUseCase,
}) => {
  const { loadGroupList, groupList, isProcessing } = useHomeViewModel({
    getGroupListUseCase,
    user: user!,
  })

  useEffect(() => {
    loadGroupList()
  }, [loadGroupList])

  const navigateToCreateGroup = () => navigation.navigate(Screens.CREATE_GROUP)
  const navigateToGroup = (group: Group) =>
    navigation.navigate(Screens.GROUP, {
      group,
    })

  return (
    <View style={styles.container}>
      <GroupList
        groupList={groupList}
        displayName={user?.displayName || 'User'}
        onRefresh={loadGroupList}
        navigateToGroup={navigateToGroup}
        isRefreshing={isProcessing}
      />
      <CreateFAB navigateToCreate={navigateToCreateGroup} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
})

export default HomeScreen
