import { Timestamp } from 'firebase/firestore'

type Room = {
  uid: string
  title: string
  date: Timestamp
  isEnded: boolean
  content: string
  createdAt: Timestamp
  endedAt?: Timestamp
}

export default Room
