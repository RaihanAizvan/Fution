import type { ApiError } from './adminClient'

export type FieldErrorMap = Record<string, string[]>

export const mapValidationErrors = (error: unknown): FieldErrorMap => {
  const details = (error as Error & { details?: ApiError }).details
  if (!details?.errors) {
    return {}
  }

  return details.errors.reduce<FieldErrorMap>((acc, entry) => {
    if (!acc[entry.field]) {
      acc[entry.field] = []
    }
    acc[entry.field].push(entry.message)
    return acc
  }, {})
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }

  return 'Request failed'
}
