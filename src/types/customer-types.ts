export interface IAddressDraft {
  key?: string
  firstName: string
  lastName: string
  streetName: string
  building: string
  apartment: string
  postalCode: string
  city: string
  country: string
  email: string
}

export interface IShippingAddressModel {
  shippingStreetName: string
  shippingBuilding: string
  shippingApartment: string
  shippingCity: string
  shippingPostalCode: string
  shippingCountry: string
}

export interface IBillingAddressModel {
  billingStreetName: string
  billingBuilding: string
  billingApartment: string
  billingCity: string
  billingPostalCode: string
  billingCountry: string
}

export interface IAddressesConfiguration {
  addresses: IAddressDraft[]
  defaultShippingAddress?: number
  defaultBillingAddress?: number
  shippingAddresses?: number[]
  billingAddresses?: number[]
}

/*export interface IAddressConfiguration {
  shippingAddresses: number[]
  defaultShippingAddress?: number
  billingAddresses?: number[]
  defaultBillingAddress?: number
}*/

export interface ICustomerDraft {
  email: string
  password: string
  firstName: string
  lastName: string
  dateOfBirth: string
  addresses: IAddressDraft[]
  defaultShippingAddress?: number // index of the default shipping address in the addresses array
  shippingAddresses?: number[] // Indices of the shipping addresses in the addresses array
  defaultBillingAddress?: number // Index of the address in the addresses array to use as the default billing address
  billingAddresses?: number[]
}
