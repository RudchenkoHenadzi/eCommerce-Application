import { defineStore } from 'pinia'
import type { Address } from '@commercetools/platform-sdk'
import type { IAddressesStore, TAddressType } from '@/stores/types/addressesTypes'
import { toRaw } from 'vue'

export const useAddressesStore = defineStore('addresses', {
  state: (): IAddressesStore => ({
    userAddresses: new Array<Address>(),
    userShippingAddressIds: new Array<string>(),
    userBillingAddressIds: new Array<string>(),
    selectedUserAddress: null
  }),
  getters: {
    addresses: (state) => state.userAddresses,
    shippingAddressIds: (state) => state.userShippingAddressIds,
    billingAddressIds: (state) => state.userBillingAddressIds,
    selectedAddress: (state) => state.selectedUserAddress
  },
  actions: {
    addAddress(address: Address | Address[]) {
      if (Array.isArray(address)) {
        toRaw(this.userAddresses).concat(address)
      } else {
        this.userAddresses.push(address)
      }
    },
    removeAddress(addressToDelete: Address | Address[]) {
      if (Array.isArray(addressToDelete)) {
        addressToDelete.forEach((address) => {
          this.userAddresses = this.userAddresses.filter(
            (userAddress) => userAddress.id !== address.id
          )
        })
      } else {
        this.userAddresses = this.userAddresses.filter(
          (address) => address.id !== addressToDelete.id
        )
      }
    },
    addId(addressType: TAddressType, id: string | string[]) {
      if (addressType === 'shipping') {
        if (Array.isArray(id)) {
          this.userShippingAddressIds.concat(id)
        } else {
          this.userShippingAddressIds.push(id)
        }
      } else {
        if (Array.isArray(id)) {
          this.userBillingAddressIds.concat(id)
        } else {
          this.userBillingAddressIds.push(id)
        }
      }
    },
    removeId(addressType: TAddressType, id: string | string[]) {
      if (addressType === 'shipping') {
        if (Array.isArray(id)) {
          id.forEach((addressId) => {
            this.userShippingAddressIds = this.userShippingAddressIds.filter(
              (shippingAddressId) => shippingAddressId !== addressId
            )
          })
        } else {
          this.userShippingAddressIds.filter((shippingAddressId) => shippingAddressId !== id)
        }
      } else {
        if (Array.isArray(id)) {
          id.forEach((addressId) => {
            this.userBillingAddressIds = this.userBillingAddressIds.filter(
              (billingAddressId) => billingAddressId !== addressId
            )
          })
        } else {
          this.userBillingAddressIds.filter((billingAddressId) => billingAddressId !== id)
        }
      }
    },
    selectAddress(address: Address) {
      this.selectedUserAddress = address
    },
    resetSelectedAddress() {
      this.selectedUserAddress = null
    }
  }
})
