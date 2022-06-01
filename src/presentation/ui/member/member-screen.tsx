import React from 'react'
import { StyleSheet, View } from 'react-native'

import FormatMemberWithAccessPropertiesUseCase from '~/interactor/group/format-member-with-access-properties-use-case'
import UpdateMemberRoleUseCase from '~/interactor/group/update-member-role-use-case'
import { Screen, Screens } from '~/presentation/navigation'

import { MemberList } from './components'
import { useMemberViewModel } from './member-view-model'

type Props = {
  formatMemberWithAccessPropertiesUseCase: FormatMemberWithAccessPropertiesUseCase
  updateMemberRoleUseCase: UpdateMemberRoleUseCase
}

const MemberScreen: Screen<Props, Screens.MEMBER> = ({
  formatMemberWithAccessPropertiesUseCase,
  updateMemberRoleUseCase,
  user,
  route,
}) => {
  const { members, groupID } = route.params
  const { membersWithAccessProperties, handleMemberRoleUpdate } =
    useMemberViewModel({
      groupID,
      formatMemberWithAccessPropertiesUseCase,
      updateMemberRoleUseCase,
      initialMembers: members,
      user: user!,
    })

  return (
    <View style={styles.container}>
      <MemberList
        membersWithAccessProperties={membersWithAccessProperties}
        handleMemberRoleUpdate={handleMemberRoleUpdate}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
})

export default MemberScreen
