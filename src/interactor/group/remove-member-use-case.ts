import { ForbiddenError } from '~/domain/error'
import { User } from '~/domain/model'
import { Member, Role } from '~/domain/model/group'
import { GroupRepository } from '~/domain/repository'
import { RemoveMemberDTO } from '~/domain/repository/group-repository'

import Result from '../result'
import UseCase from '../use-case'

type DTO = RemoveMemberDTO & {
  user: User
  members: Record<string, Member>
}

export default class RemoveMemberUseCase implements UseCase<DTO, null> {
  private permissionMap: Record<Role, Role[]> = {
    [Role.OWNER]: [Role.ADMIN, Role.MEMBER],
    [Role.ADMIN]: [Role.MEMBER],
    [Role.MEMBER]: [],
  }

  constructor(private groupRepository: GroupRepository) {}

  async invoke(dto: DTO): Promise<Result<null>> {
    const { user, members, memberID } = dto

    try {
      const userRole = members[user.uid].role
      const memberRole = members[memberID].role
      const hasPermission = this.permissionMap[userRole].includes(memberRole)
      if (!hasPermission)
        throw new ForbiddenError('You have no permission to remove member')

      await this.groupRepository.removeMember(dto)
      return {
        data: null,
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
