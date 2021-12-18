import { updateProfile, User } from 'firebase/auth'

type Params = {
  user: User
  displayName: string
}

type Returns = {
  error: unknown
}

export const setDisplayName = async (params: Params): Promise<Returns> => {
  const { user, displayName } = params

  try {
    await updateProfile(user, {
      displayName,
    })

    return { error: null }
  } catch (error) {
    return { error }
  }
}
