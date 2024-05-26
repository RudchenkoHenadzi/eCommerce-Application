import type { IAddressDraft, ICustomerDraft } from '@/types/customer-types'

export function createCustomerDraft(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  addresses: IAddressDraft[],
  addressesConfiguration?: {
    defaultShippingAddress?: number
    defaultBillingAddress?: number
    shippingAddresses?: number[]
    billingAddresses?: number[]
  }
): ICustomerDraft {
  const customerDraft: ICustomerDraft = {
    dateOfBirth: dateOfBirth,
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: password,
    addresses: addresses,
    shippingAddresses: [0],
    billingAddresses: [0]
  }

  if (addressesConfiguration) {
    const { defaultShippingAddress, defaultBillingAddress, shippingAddresses, billingAddresses } =
      addressesConfiguration

    if (defaultShippingAddress || defaultShippingAddress === 0) {
      customerDraft.defaultShippingAddress = defaultShippingAddress
    }
    if (shippingAddresses) {
      customerDraft.shippingAddresses = shippingAddresses
    }
    if (defaultBillingAddress || defaultBillingAddress === 0) {
      customerDraft.defaultBillingAddress = defaultBillingAddress
    }
    if (billingAddresses) {
      customerDraft.billingAddresses = billingAddresses
    }
  }
  return customerDraft
}

export function createAddressDraft(
  firstName: string,
  lastName: string,
  email: string,
  postalCode: string,
  city: string,
  streetName: string,
  building: string,
  apartment: string
) {
  return {
    country: 'RU',
    streetName: streetName,
    postalCode: postalCode,
    city: city,
    firstName: firstName,
    lastName: lastName,
    building: building,
    apartment: apartment,
    email: email
  }
}
