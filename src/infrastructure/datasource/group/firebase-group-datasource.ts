import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore'

import { UnknownError } from '~/common/error'
import GroupDataSource from '~/data/group/group-datasource'
import { Group, User } from '~/domain/model'
import { Role } from '~/domain/model/group'
import { CreateGroupDTO } from '~/domain/repository/group-repository'
import Firebase from '~/infrastructure/firebase'

export default class FirebaseGroupDataSource implements GroupDataSource {
  constructor(private firebase: Firebase) {}

  async getGroupList(user: User): Promise<Group[]> {
    try {
      const snapshot = await getDocs(
        query(
          collection(this.firebase.db, 'group'),
          where(`members.${user.uid}`, '!=', null),
        ),
      )
      return snapshot.docs.map((document) => ({
        uid: document.id,
        ...document.data(),
      })) as Group[]
    } catch (error) {
      throw new UnknownError(error)
    }
  }

  async createGroup(dto: CreateGroupDTO): Promise<void> {
    const { user, groupName } = dto
    const currentTimestamp = Timestamp.now()

    try {
      await addDoc(collection(this.firebase.db, 'group'), {
        name: groupName,
        members: {
          [user.uid]: {
            name: user.displayName,
            role: Role.OWNER,
          },
        },
        createdAt: currentTimestamp,
        updatedAt: currentTimestamp,
      })
    } catch (error) {
      throw new UnknownError(error)
    }
  }
}
