import { Timestamp } from 'firebase/firestore'

type Room = {
  uid: string
  title: string
  date: Timestamp
  content: string
}

export default Room
