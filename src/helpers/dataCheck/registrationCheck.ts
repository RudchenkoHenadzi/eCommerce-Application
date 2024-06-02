import type { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk'

export function isUserExist(error: unknown) {
  return error instanceof Error && error.message === "There is already an existing customer with the provided email."
}

export function isRegistrationRequestSuccess(result: ClientResponse<CustomerSignInResult>) {
  return result.statusCode === 201
}
