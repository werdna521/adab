import { User } from '~/domain/model'
import { Member, MemberWithAccessProperties, Role } from '~/domain/model/group'

import Result from '../result'
import UseCase from '../use-case'

type DTO = {
  user: User
  members: Record<string, Member>
}

export default class FormatMemberWithAccessPropertiesUseCase
  implements UseCase<DTO, Record<string, MemberWithAccessProperties>>
{
  async invoke(
    dto: DTO,
  ): Promise<Result<Record<string, MemberWithAccessProperties>>> {
    const { user, members } = dto
    const self = members[user.uid]
    const isSelfAdmin = self.role === Role.ADMIN
    const isSelfOwner = self.role === Role.OWNER

    const membersWithAccessProperties: Record<
      string,
      MemberWithAccessProperties
    > = Object.entries(members).reduce((acc, [id, member]) => {
      const isSelf = id === user.uid
      const isMember = member.role === Role.MEMBER
      const canEditRole = (isSelfOwner || (isSelfAdmin && isMember)) && !isSelf
      const canRemoveMember =
        (isSelfOwner || (isSelfAdmin && isMember)) && !isSelf

      return {
        ...acc,
        [id]: {
          ...member,
          isSelf,
          canEditRole,
          canRemoveMember,
        },
      }
    }, {})

    console.log(membersWithAccessProperties)

    return {
      data: membersWithAccessProperties,
      error: null,
    }
  }
}
