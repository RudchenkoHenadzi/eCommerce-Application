<template>
  <div class="addresses profile__content">
    <h2 class="addresses__title">{{ title }}</h2>
    <AddressForm
      v-if="isAddressEditModeOn"
      :close-event-name="EVENT_NAMES.MANAGE_ADDRESSES"
      @manageAddresses="manageAddressesHandler"
    />
    <div class="address-liner__wrapper" v-else>
      <AddressLinesHolder
        v-for="address in addresses"
        :key="address.id"
        :streetName="address.streetName"
        :building="address.building"
        :apartment="address.apartment"
        :postalCode="address.postalCode"
        :city="address.city"
        :country="address.country"
        :isAddressDefault="defaultAddressId === address.id"
      />
    </div>
    <AddressForm
      v-if="isAddressAddModeOn"
      :close-event-name="EVENT_NAMES.MANAGE_ADDRESSES"
      @manageAddresses="addAddressesHandler"
    />
    <AddElementCard v-else :text="textToAddButton" @manageAddresses="addAddressesHandler" />
  </div>
</template>

<script lang="ts">
import AddressLinesHolder from '@/components/blocks/AddressLinesHolder.vue'
import type { Address } from '@commercetools/platform-sdk'
import AddElementCard from '@/components/cards/AddElementCard.vue'
import AddressForm from '@/components/forms/AddressForm.vue'
import { EVENT_NAMES, EVENT_TYPE_NAMES } from '@/constants/constants'
import { addNewAddress } from '@/services/apiMethods/user/addNewAddress'
import { useUserStore } from '@/stores/User'

export default {
  name: 'AddressBlock',

  components: { AddressForm, AddElementCard, AddressLinesHolder },

  props: {
    title: String,
    addresses: Array<Address>,
    defaultAddressId: String,
    textToAddButton: String
  },

  data() {
    return {
      userStore: useUserStore(),
      isAddressEditModeOn: false,
      isAddressAddModeOn: false
    }
  },

  methods: {
    async addAddressesHandler(
      eventType: string,
      city?: string,
      street?: string,
      building?: string,
      apartment?: string,
      postCode?: string
    ) {
      if (eventType === EVENT_TYPE_NAMES.PROFILE_EVENTS.MANAGE_ADDRESSES.CHANGE_VIEW_TO_EDIT) {
        this.isAddressEditModeOn = true
      } else {
        if (city && street && building && apartment && postCode)
          try {
            const result = await addNewAddress(
              this.version,
              city,
              street,
              building,
              apartment,
              postCode
            )
            if (result.statusCode === 200 || result.statusCode === 201) {
              this.isAddressEditModeOn = false
            }
          } catch (error) {
            console.log(error)
          }
      }
    }
  },

  computed: {
    EVENT_NAMES() {
      return EVENT_NAMES
    },
    version() {
      return this.userStore.version
    }
  }
}
</script>

<style lang="scss">
.addresses {
  padding: 30px;
  background-color: #eaebed;
  border-radius: 15px;
  box-shadow: 5px 5px 10px darkgray;
}
</style>
