import {
  addDoc,
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore'

import { UnknownError } from '~/common/error'
import GroupDataSource from '~/data/group/group-datasource'
import { Group, User } from '~/domain/model'
import { Role } from '~/domain/model/group'
import {
  CreateGroupDTO,
  JoinGroupDTO,
  RemoveMemberDTO,
  UpdateMemberRoleDTO,
} from '~/domain/repository/group-repository'
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
    const { user, groupName, label } = dto
    const currentTimestamp = Timestamp.now()

    try {
      await addDoc(collection(this.firebase.db, 'group'), {
        label,
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

  async updateMemberRole(dto: UpdateMemberRoleDTO): Promise<void> {
    const { role, memberID, groupID } = dto
    const currentTimestamp = Timestamp.now()

    try {
      await updateDoc(doc(this.firebase.db, 'group', groupID), {
        [`members.${memberID}.role`]: role,
        updatedAt: currentTimestamp,
      })
    } catch (error) {
      throw new UnknownError(error)
    }
  }

  async removeMember(dto: RemoveMemberDTO): Promise<void> {
    const { memberID, groupID } = dto
    const currentTimestamp = Timestamp.now()

    try {
      await updateDoc(doc(this.firebase.db, 'group', groupID), {
        [`members.${memberID}`]: deleteField(),
        updatedAt: currentTimestamp,
      })
    } catch (error) {
      throw new UnknownError(error)
    }
  }

  async joinGroup(dto: JoinGroupDTO): Promise<void> {
    const { groupID, user } = dto
    const currentTimestamp = Timestamp.now()

    try {
      await updateDoc(doc(this.firebase.db, 'group', groupID), {
        [`members.${user.uid}`]: {
          name: user.displayName,
          role: Role.MEMBER,
        },
        updatedAt: currentTimestamp,
      })
    } catch (error) {
      throw new UnknownError(error)
    }
  }

  async getGroupDetails(groupID: string): Promise<Group> {
    try {
      const snapshot = await getDoc(doc(this.firebase.db, 'group', groupID))
      const group = {
        uid: snapshot.id,
        ...snapshot.data(),
      } as Group

      const users = await Promise.all(
        Object.keys(group.members).map(async (uid) => {
          console.log({ uid })
          const userSnapshot = await getDoc(doc(this.firebase.db, 'user', uid))
          return userSnapshot.data() as User
        }),
      )

      const cibai = {
        ...group,
        members: Object.entries(group.members).reduce((acc, [uid, member]) => {
          const user = users.find(({ uid: userUID }) => userUID === uid)

          return {
            ...acc,
            [uid]: {
              name: user?.displayName,
              role: member.role,
            },
          }
        }, {}),
      }
      console.log(cibai)

      return cibai
    } catch (error) {
      throw new UnknownError(error)
    }
  }
}
