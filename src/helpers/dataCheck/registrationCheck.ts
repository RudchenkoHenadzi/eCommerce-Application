import type { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk'

export function isUserExist(error: unknown) {
  return error instanceof Error && error.message.includes('already an existing customer')
}

export function isRegistrationRequestSuccess(result: ClientResponse<CustomerSignInResult>) {
  return result.statusCode === 201
}
