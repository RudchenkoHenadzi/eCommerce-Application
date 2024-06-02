import type { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk'

export function isUserNotFound(error: unknown) {
  return error instanceof Error && error.message.includes('not found') ||
    error instanceof Error && error.message.includes('userNotExist')
}

export function isLoginRequestSuccess(result: ClientResponse<CustomerSignInResult>) {
  return result.statusCode === 200
}
