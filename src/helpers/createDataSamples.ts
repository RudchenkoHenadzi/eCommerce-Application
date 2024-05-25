import type { IAddressDraft, ICustomerDraft } from '@/types/customer-types'

export function createCustomerDraft(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  country: string,
  postalCode: string,
  city: string,
  streetName: string,
  building: string,
  apartment: string
): ICustomerDraft {
  const countrySign = country === 'Россия' ? 'RU' : 'RU'
  const shippingAddressDraft: IAddressDraft = createShippingAddressDraft(
    countrySign,
    firstName,
    lastName,
    streetName,
    postalCode,
    city,
    building,
    apartment,
    email
  )
  return {
    dateOfBirth: dateOfBirth,
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: password,
    addresses: [shippingAddressDraft],
    defaultShippingAddress: 0, // index of the default shipping address in the addresses array
    shippingAddresses: [0], // Indices of the shipping addresses in the addresses array
    defaultBillingAddress: 0, // Index of the address in the addresses array to use as the default billing address
    billingAddresses: [0]
  }
}

export function createShippingAddressDraft(
  country: string,
  firstName: string,
  lastName: string,
  streetName: string,
  postalCode: string,
  city: string,
  building: string,
  apartment: string,
  email: string
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
