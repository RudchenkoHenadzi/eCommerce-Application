export interface IAddressDraft {
  key?: string
  firstName: string
  lastName: string
  streetName: string
  postalCode: string
  city: string
  country: string
  email: string
}

export interface ICustomerDraft {
  email: string
  firstName: string
  lastName: string
  password: string
  dateOfBirth: string
  addresses: IAddressDraft[]
  defaultShippingAddress: number // index of the default shipping address in the addresses array
  shippingAddresses: number[] // Indices of the shipping addresses in the addresses array
  defaultBillingAddress: number // Index of the address in the addresses array to use as the default billing address
  billingAddresses: number[]
}
