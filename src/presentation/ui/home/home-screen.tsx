import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

import GetGroupListUseCase from '~/interactor/group/get-group-list-use-case'
import { Screen, Screens } from '~/presentation/navigation'

import { CreateGroupFAB, GroupList } from './components'
import { useHomeViewModel } from './home-view-model'

type Props = {
  getGroupListUseCase: GetGroupListUseCase
}

const HomeScreen: Screen<Props, Screens.HOME> = ({
  user,
  navigation,
  getGroupListUseCase,
}) => {
  const { loadGroupList, groupList, globalError, isProcessing } =
    useHomeViewModel({
      getGroupListUseCase,
      user: user!,
    })

  useEffect(() => {
    loadGroupList()
  }, [loadGroupList])

  const navigateToCreateGroup = () => navigation.navigate(Screens.CREATE_GROUP)

  return (
    <View style={styles.container}>
      <GroupList
        groupList={groupList}
        displayName={user?.displayName || 'User'}
      />
      <CreateGroupFAB navigateToCreateGroup={navigateToCreateGroup} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
})

export default HomeScreen
