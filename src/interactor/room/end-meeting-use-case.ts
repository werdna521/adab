import { CannotEndMeetingError } from '~/domain/error'
import { User } from '~/domain/model'
import { Member, Role } from '~/domain/model/group'
import { RoomRepository } from '~/domain/repository'
import { EndMeetingDTO } from '~/domain/repository/room-repository'

import Result from '../result'
import UseCase from '../use-case'

type DTO = EndMeetingDTO & {
  user: User
  members: Record<string, Member>
}

export default class EndMeetingUseCase implements UseCase<DTO, null> {
  private permissionMap: Record<Role, boolean> = {
    [Role.OWNER]: true,
    [Role.ADMIN]: true,
    [Role.MEMBER]: false,
  }
  constructor(private roomRepository: RoomRepository) {}

  async invoke(dto: DTO): Promise<Result<null>> {
    const { user, members } = dto

    try {
      const role = members[user.uid].role
      const hasPermission = this.permissionMap[role]
      if (!hasPermission) throw new CannotEndMeetingError()

      await this.roomRepository.endMeeting(dto)
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
