import { ForbiddenError } from '~/domain/error'
import { User } from '~/domain/model'
import { Member, Role } from '~/domain/model/group'

import Result from '../result'
import UseCase from '../use-case'

type DTO = {
  user: User
  members: Record<string, Member>
  groupID: string
}

export default class GetGroupInviteLinkUseCase implements UseCase<DTO, string> {
  private permissionMap: Record<Role, boolean> = {
    [Role.MEMBER]: false,
    [Role.ADMIN]: true,
    [Role.OWNER]: true,
  }

  async invoke(dto: DTO): Promise<Result<string>> {
    const { groupID, members, user } = dto

    try {
      const userRole = members[user.uid].role
      const hasPermission = this.permissionMap[userRole]
      if (!hasPermission) throw new ForbiddenError('No permission to copy link')

      const invitationLink = `https://adab.bearcats.dev/join?groupID=${groupID}`
      return {
        data: invitationLink,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error: error as Error,
      }
    }
  }
}
