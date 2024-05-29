import type { IBillingAddressModel, IShippingAddressModel } from '@/types/customer-types'
import { useApiRootStore } from '@/stores/ApiRootStore'
import apiRootManagement from '@/services/apiRootManagement/ApiRootManagement'
import { createAddressesConfiguration, createCustomerDraft } from '@/helpers/registrationHelpers'
import { isRegistrationRequestSuccess, isUserExist } from '@/helpers/errorsCheck/registrationErrors'

export default async function userRegistration(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  isShippingAddressDefault: boolean,
  isBillingAddressDefault: boolean,
  shippindAddress: IShippingAddressModel,
  billingAddress?: IBillingAddressModel,
  anonymousCartId?: string
) {
  const apiRootStore = useApiRootStore()
  const apiRoot = apiRootStore.apiRoot
  try {
    const addressesConfiguration = createAddressesConfiguration(
      firstName,
      lastName,
      email,
      isShippingAddressDefault,
      isBillingAddressDefault,
      shippindAddress,
      billingAddress
    )

    const customerDraft = createCustomerDraft(
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      addressesConfiguration
    )
    try {
      const registrationResult = await apiRoot
        .customers()
        .post({
          body: customerDraft
        })
        .execute()

      if (isRegistrationRequestSuccess(registrationResult)) {
        const { email, password } = customerDraft
        apiRootStore.setNewApiRoot(apiRootManagement.createAuthSessionFlow(email, password))
      }
      return registrationResult
    } catch (error) {
      if (isUserExist(error)) {
        throw new Error('userExists')
      } else {
        throw new Error('commonError')
      }
    }
  } catch (e) {
    throw new Error('commonError')
  }
}
