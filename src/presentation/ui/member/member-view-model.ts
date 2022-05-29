import { useEffect, useState } from 'react'

import { User } from '~/domain/model'
import { Member, MemberWithAccessProperties } from '~/domain/model/group'
import FormatMemberWithAccessPropertiesUseCase from '~/interactor/group/format-member-with-access-properties-use-case'

type Params = {
  user: User
  members: Record<string, Member>
  formatMemberWithAccessPropertiesUseCase: FormatMemberWithAccessPropertiesUseCase
}

export const useMemberViewModel = (params: Params) => {
  const { user, members, formatMemberWithAccessPropertiesUseCase } = params
  const [membersWithAccessProperties, setMembersWithAccessProperties] =
    useState<Record<string, MemberWithAccessProperties>>({})

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

  return {
    membersWithAccessProperties,
  }
}
