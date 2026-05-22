import { json } from '@sveltejs/kit'
import t from '$lang/lang'
import type { ZodError } from 'zod'
import secretPrivate from '$config/secretPrivate'

/**
 * Standard success response
 */
export const resSuccess = (message: string = 'Success', status: number = 200) => {
  return json({ message }, { status })
}

/**
 * Success response with data
 */
export const resSuccessData = (data: any, message: string = 'Success', status: number = 200) => {
  return json({ message, data }, { status })
}

/**
 * Error response
 */
export const resError = (message: string = 'Error', errors: any = null, status: number = 400) => {
  return json(
    {
      message,
      ...(errors && { errors }),
    },
    { status }
  )
}

/**
 * Success response with pagination
 */
export const resPaginate = (
  data: any[],
  meta: { total: number; page: number; limit: number },
  message: string = 'Success'
) => {
  return json(
    {
      message,
      data,
      meta: {
        total: meta.total,
        page: meta.page,
        limit: meta.limit,
        total_page: Math.ceil(meta.total / meta.limit),
      },
    },
    { status: 200 }
  )
}

/**
 * Handle unexpected errors in catch blocks
 */
export const resCatch = (error: any) => {
  if (secretPrivate.APP_ENV === 'local') return resError(error?.message, null, 500)

  return resError(t._('something_went_wrong'), null, 500)
}

/**
 * Handle Zod validation errors
 */
export const resValidate = (error: ZodError) => {
  const errors = error.issues.reduce((acc: any, issue) => {
    acc[issue.path[0]] = issue.message
    return acc
  }, {})

  return resError(t._('err_validation'), errors, 400)
}
