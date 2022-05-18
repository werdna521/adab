import { addDoc, collection, Timestamp } from 'firebase/firestore'

import GroupDataSource from '~/data/group/group-datasource'
import { CreateGroupDTO } from '~/domain/repository/group-repository'
import Firebase from '~/infrastructure/firebase'

export default class FirebaseGroupDataSource implements GroupDataSource {
  constructor(private firebase: Firebase) {}

  async createGroup(dto: CreateGroupDTO): Promise<void> {
    const { user, groupName } = dto

    const currentTimestamp = Timestamp.now()
    addDoc(collection(this.firebase.db, 'group'), {
      name: groupName,
      members: {
        [user.uid]: true,
      },
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    })
  }
}
