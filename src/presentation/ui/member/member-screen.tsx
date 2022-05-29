import React from 'react'
import { StyleSheet, View } from 'react-native'

import FormatMemberWithAccessPropertiesUseCase from '~/interactor/group/format-member-with-access-properties-use-case'
import { Screen, Screens } from '~/presentation/navigation'

import { MemberList } from './components'
import { useMemberViewModel } from './member-view-model'

type Props = {
  formatMemberWithAccessPropertiesUseCase: FormatMemberWithAccessPropertiesUseCase
}

const MemberScreen: Screen<Props, Screens.MEMBER> = ({
  formatMemberWithAccessPropertiesUseCase,
  user,
  route,
}) => {
  const { members } = route.params
  const { membersWithAccessProperties } = useMemberViewModel({
    members,
    user: user!,
    formatMemberWithAccessPropertiesUseCase,
  })

  return (
    <View style={styles.container}>
      <MemberList membersWithAccessProperties={membersWithAccessProperties} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
})

export default MemberScreen
