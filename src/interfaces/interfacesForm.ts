interface Address {
  country: string
  city: string
  postalCode: string
  streetName: string
}

export interface RegistrationForm {
  email: string
  password: string
  firstName: string
  lastName: string
  dateOfBirth: string
  addresses: Address[]
  defaultShippingAddress: number | null
  defaultBillingAddress: number | null
}
