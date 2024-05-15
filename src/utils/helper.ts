import { isAxiosError, AxiosError } from 'axios'

export function isUnauthorizedError(error: unknown): error is AxiosError {
  return isAxiosError(error) && error.response?.status === 401
}
