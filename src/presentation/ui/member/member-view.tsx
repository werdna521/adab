import React from 'react'
import { StyleSheet, View } from 'react-native'

import FormatMemberWithAccessPropertiesUseCase from '~/interactor/group/format-member-with-access-properties-use-case'
import RemoveMemberUseCase from '~/interactor/group/remove-member-use-case'
import UpdateMemberRoleUseCase from '~/interactor/group/update-member-role-use-case'
import { Screen, Screens } from '~/presentation/navigation'

import { MemberList } from './components'
import { useMemberViewModel } from './member-view-model'

type Props = {
  formatMemberWithAccessPropertiesUseCase: FormatMemberWithAccessPropertiesUseCase
  updateMemberRoleUseCase: UpdateMemberRoleUseCase
  removeMemberUseCase: RemoveMemberUseCase
}

const MemberView: Screen<Props, Screens.MEMBER> = ({
  formatMemberWithAccessPropertiesUseCase,
  updateMemberRoleUseCase,
  removeMemberUseCase,
  user,
  route,
}) => {
  const { members, groupID } = route.params
  const {
    membersWithAccessProperties,
    handleMemberRoleUpdate,
    handleRemoveMember,
  } = useMemberViewModel({
    groupID,
    formatMemberWithAccessPropertiesUseCase,
    updateMemberRoleUseCase,
    removeMemberUseCase,
    initialMembers: members,
    user: user!,
  })

  return (
    <View style={styles.container}>
      <MemberList
        membersWithAccessProperties={membersWithAccessProperties}
        handleMemberRoleUpdate={handleMemberRoleUpdate}
        handleRemoveMember={handleRemoveMember}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
})

export default MemberView
