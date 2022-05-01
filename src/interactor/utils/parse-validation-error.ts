import * as z from 'zod'

export const parseValidationError = (zodError: z.ZodError) => {
  return zodError?.errors?.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.path[0]]: curr.message,
    }),
    {},
  )
}
