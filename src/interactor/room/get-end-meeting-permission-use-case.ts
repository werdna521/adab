import { User } from '~/domain/model'
import { Member, Role } from '~/domain/model/group'

import Result from '../result'
import UseCase from '../use-case'

type DTO = {
  user: User
  members: Record<string, Member>
}

export default class GetEndMeetingPermissionUseCase
  implements UseCase<DTO, boolean>
{
  private permissionMap: Record<Role, boolean> = {
    [Role.OWNER]: true,
    [Role.ADMIN]: true,
    [Role.MEMBER]: false,
  }

  async invoke(dto: DTO): Promise<Result<boolean>> {
    const { user, members } = dto
    const role = members[user.uid].role
    const hasPermission = this.permissionMap[role]

    return {
      data: hasPermission,
      error: null,
    }
  }
}
