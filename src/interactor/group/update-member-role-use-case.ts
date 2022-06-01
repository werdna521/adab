import { ForbiddenError } from '~/domain/error'
import { User } from '~/domain/model'
import { Member, Role } from '~/domain/model/group'
import { GroupRepository } from '~/domain/repository'
import { UpdateMemberRoleDTO } from '~/domain/repository/group-repository'

import Result from '../result'
import UseCase from '../use-case'

type DTO = UpdateMemberRoleDTO & {
  user: User
  members: Record<string, Member>
}

export default class UpdateMemberRoleUseCase implements UseCase<DTO, null> {
  private permissionMap: Record<Role, Role[]> = {
    [Role.OWNER]: [Role.ADMIN, Role.MEMBER],
    [Role.ADMIN]: [Role.ADMIN],
    [Role.MEMBER]: [],
  }

  constructor(private groupRepository: GroupRepository) {}

  async invoke(dto: DTO): Promise<Result<null>> {
    const { user, role, members } = dto

    try {
      const userRole = members[user.uid].role
      const hasPermission = this.permissionMap[userRole].includes(role)
      if (!hasPermission)
        throw new ForbiddenError('No permission to update role')

      await this.groupRepository.updateMemberRole(dto)
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
