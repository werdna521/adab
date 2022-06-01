import { useEffect, useState } from 'react'
import { Alert } from 'react-native'

import { UnknownError } from '~/common/error'
import { ForbiddenError } from '~/domain/error'
import { User } from '~/domain/model'
import { Member, MemberWithAccessProperties, Role } from '~/domain/model/group'
import FormatMemberWithAccessPropertiesUseCase from '~/interactor/group/format-member-with-access-properties-use-case'
import RemoveMemberUseCase from '~/interactor/group/remove-member-use-case'
import UpdateMemberRoleUseCase from '~/interactor/group/update-member-role-use-case'

type Params = {
  user: User
  groupID: string
  initialMembers: Record<string, Member>
  formatMemberWithAccessPropertiesUseCase: FormatMemberWithAccessPropertiesUseCase
  updateMemberRoleUseCase: UpdateMemberRoleUseCase
  removeMemberUseCase: RemoveMemberUseCase
}

const ROLE_UPDATE_MAP = {
  [Role.ADMIN]: Role.MEMBER,
  [Role.MEMBER]: Role.ADMIN,
  [Role.OWNER]: Role.OWNER,
}

export const useMemberViewModel = (params: Params) => {
  const {
    user,
    groupID,
    initialMembers,
    formatMemberWithAccessPropertiesUseCase,
    updateMemberRoleUseCase,
    removeMemberUseCase,
  } = params
  const [membersWithAccessProperties, setMembersWithAccessProperties] =
    useState<Record<string, MemberWithAccessProperties>>({})
  const [members, setMembers] = useState(initialMembers)

  useEffect(() => {
    formatMemberWithAccessPropertiesUseCase
      .invoke({
        user,
        members,
      })
      .then(({ data }) => {
        setMembersWithAccessProperties(data!)
      })
  }, [user, members, formatMemberWithAccessPropertiesUseCase])

  const handleMemberRoleUpdate = async (memberID: string) => {
    const role = ROLE_UPDATE_MAP[members[memberID].role]

    const { error } = await updateMemberRoleUseCase.invoke({
      groupID,
      role,
      memberID,
      user,
      members,
    })
    if (error instanceof ForbiddenError) {
      Alert.alert("You have no permission to update the member's role")
      return
    }
    if (error instanceof UnknownError) {
      Alert.alert('Something went wrong. Please try again.')
      return
    }

    setMembers((prevState) => ({
      ...prevState,
      [memberID]: {
        ...prevState[memberID],
        role,
      },
    }))
  }

  const handleRemoveMember = async (memberID: string) => {
    const { error } = await removeMemberUseCase.invoke({
      groupID,
      memberID,
      user,
      members,
    })
    if (error instanceof ForbiddenError) {
      Alert.alert('You have no permission to remove member')
      return
    }
    if (error instanceof UnknownError) {
      Alert.alert('Something went wrong. Please try again.')
      return
    }

    setMembers((prevState) => {
      const newState = { ...prevState }
      delete newState[memberID]
      return newState
    })
  }

  return {
    membersWithAccessProperties,
    handleMemberRoleUpdate,
    handleRemoveMember,
  }
}
