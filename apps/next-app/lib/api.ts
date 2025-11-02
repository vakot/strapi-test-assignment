import { AxiosError } from 'axios'

import {
  DEFAULT_API_ERROR_MESSAGE,
  DEFAULT_API_ERROR_STATUS,
} from '@constants/api'

type AxiosErrorCode = NonNullable<AxiosError['code']>
type ErrorWithCode = { code?: string }

export const GENERIC_ERROR_MESSAGE: Record<AxiosErrorCode, string> = {
  [AxiosError.ECONNABORTED]: 'Request timed out',
  [AxiosError.ERR_BAD_OPTION]: 'Invalid request options',
  [AxiosError.ERR_BAD_OPTION_VALUE]: 'Invalid option value provided',
  [AxiosError.ERR_BAD_REQUEST]: 'Bad request sent to server',
  [AxiosError.ERR_BAD_RESPONSE]: 'Unexpected response from server',
  [AxiosError.ERR_CANCELED]: 'Request was canceled',
  [AxiosError.ERR_DEPRECATED]: 'Deprecated feature used in request',
  [AxiosError.ERR_FR_TOO_MANY_REDIRECTS]: 'Too many redirects occurred',
  [AxiosError.ERR_INVALID_URL]: 'Request URL is invalid',
  [AxiosError.ERR_NETWORK]: 'Network error – unable to reach server',
  [AxiosError.ERR_NOT_SUPPORT]: 'Request method not supported',
  [AxiosError.ETIMEDOUT]: 'Connection timed out',
} as const

export const GENERIC_ERROR_STATUS: Record<AxiosErrorCode, number> = {
  [AxiosError.ECONNABORTED]: 408, // Request Timeout
  [AxiosError.ERR_BAD_OPTION]: 400, // Bad Request
  [AxiosError.ERR_BAD_OPTION_VALUE]: 400, // Bad Request
  [AxiosError.ERR_BAD_REQUEST]: 400, // Bad Request
  [AxiosError.ERR_BAD_RESPONSE]: 502, // Bad Gateway
  [AxiosError.ERR_CANCELED]: 499, // Client Closed Request
  [AxiosError.ERR_DEPRECATED]: 426, // Upgrade Required / Deprecated
  [AxiosError.ERR_FR_TOO_MANY_REDIRECTS]: 310, // Too many redirects (non-standard)
  [AxiosError.ERR_INVALID_URL]: 400, // Bad Request
  [AxiosError.ERR_NETWORK]: 503, // Service Unavailable
  [AxiosError.ERR_NOT_SUPPORT]: 405, // Method Not Allowed
  [AxiosError.ETIMEDOUT]: 504, // Gateway Timeout
} as const

const getErrorMessage = (error: unknown): string => {
  if (error && typeof error === 'object') {
    const { code } = error as ErrorWithCode
    if (code && code in GENERIC_ERROR_MESSAGE) {
      return GENERIC_ERROR_MESSAGE[code as keyof typeof GENERIC_ERROR_MESSAGE]
    }
  }
  return DEFAULT_API_ERROR_MESSAGE
}

const getErrorStatus = (error: unknown): number => {
  if (error && typeof error === 'object') {
    const { code } = error as ErrorWithCode
    if (code && code in GENERIC_ERROR_STATUS) {
      return GENERIC_ERROR_STATUS[code as keyof typeof GENERIC_ERROR_STATUS]
    }
  }
  return DEFAULT_API_ERROR_STATUS
}

export { getErrorMessage, getErrorStatus }
