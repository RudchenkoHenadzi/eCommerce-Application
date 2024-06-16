import type { Address } from '@commercetools/platform-sdk';

export type TAddressType = 'shipping' | 'billing';

export const AddressesStoreId = 'addresses';

export type TAddressesStoreId = typeof AddressesStoreId;

export interface IAddressesState {
  userAddresses: Address[];
  userShippingAddressIds: string[];
  userBillingAddressIds: string[];
  selectedUserAddress: null | Address;
}

export interface IAddressesGetters {
  addresses: Address[];
  shippingAddressIds: string[];
  billingAddressIds: string[];
  selectedAddress: null | Address;
}

export interface IAddressesActions {
  addAddress: (address: Address | Address[]) => void;
  removeAddress: (addressToDelete: Address | Address[]) => void;
  addId: (addressType: TAddressType, id: string | string[]) => void;
  removeId: (addressType: TAddressType, id: string | string[]) => void;
  selectAddress: (address: Address) => void;
  resetSelectedAddress: () => void;
}
