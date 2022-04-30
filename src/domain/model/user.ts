import { Timestamp } from 'firebase/firestore'

type User = {
  createdAt: Timestamp
  updatedAt: Timestamp
  displayName: string
  email: string
  uid: string
}

export default User
