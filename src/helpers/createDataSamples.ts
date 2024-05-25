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
  const customerDraft = {
    dateOfBirth: dateOfBirth,
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: password,
    addresses: addresses,
    defaultShippingAddress: 0, // index of the default shipping address in the addresses array
    shippingAddresses: [0], // Indices of the shipping addresses in the addresses array
    defaultBillingAddress: 0, // Index of the address in the addresses array to use as the default billing address
    billingAddresses: [0]
  }
  if (addressesConfiguration) {
    const { defaultShippingAddress, defaultBillingAddress, shippingAddresses, billingAddresses } =
      addressesConfiguration
    if (defaultShippingAddress) {
      customerDraft.defaultShippingAddress = defaultShippingAddress
    }
    if (shippingAddresses) {
      customerDraft.shippingAddresses = shippingAddresses
    }
    if (defaultBillingAddress) {
      customerDraft.defaultBillingAddress = defaultBillingAddress
    }
    if (billingAddresses) {
      customerDraft.billingAddresses = billingAddresses
    }
  }
  return customerDraft
}

export function createShippingAddressDraft(
  firstName: string,
  lastName: string,
  email: string,
  country: string,
  postalCode: string,
  city: string,
  streetName: string,
  building: string,
  apartment: string
) {
  return {
    country: country,
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
