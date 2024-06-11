import type { Address } from '@commercetools/platform-sdk'

export interface IAddressesStore {
  userAddresses: Address[]
  userShippingAddressIds: string[]
  userBillingAddressIds: string[]
  selectedUserAddress: null | Address
}

export type TAddressType = 'shipping' | 'billing'
