import type { IBillingAddressModel, IShippingAddressModel } from '@/types/customer-types'
import { useApiRootStore } from '@/stores/ApiRootStore'
import { createAddressesConfiguration, createCustomerDraft } from '@/helpers/registrationHelpers'
import { isRegistrationRequestSuccess, isUserExist } from '@/helpers/dataCheck/registrationCheck'

export default async function userRegistration(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  isShippingAddressDefault: boolean,
  isBillingAddressDefault: boolean,
  shippingAddress: IShippingAddressModel,
  billingAddress?: IBillingAddressModel
) {
  const apiRootStore = useApiRootStore()
  const apiRoot = apiRootStore.apiRoot
  try {
    /* TODO неверно создает конфиг, проверить*/
    const addressesConfiguration = createAddressesConfiguration(
      firstName,
      lastName,
      email,
      isShippingAddressDefault,
      isBillingAddressDefault,
      shippingAddress,
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

    const registrationResult = await apiRoot
      .customers()
      .post({
        body: customerDraft
      })
      .execute()

    if (isRegistrationRequestSuccess(registrationResult)) {
      const { email, password } = customerDraft
      apiRootStore.createAuthApiRoot(email, password)
    }
    return registrationResult
  } catch (error) {
    if (isUserExist(error)) {
      throw new Error('userExists')
    } else {
      throw new Error('commonError')
    }
  }
}
