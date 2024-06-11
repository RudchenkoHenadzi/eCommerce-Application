<template>
  <div class="addresses profile__content">
    <h2 class="addresses__title">{{ title }}</h2>
    <div class="address-form__wrapper" v-if="isAddressEditModeOn">
      <AddressForm
        v-for="address in addresses"
        :close-event-name="EVENT_NAMES.MANAGE_ADDRESSES"
        :block-name="blockName"
        formTitle="Добавить адрес"
        :key="address.id"
        :id="String(address.id)"
        :isAddressDefault="defaultAddressId === address.id"
        @manageAddresses="editAddressesHandler"
        @changeDefaultAddress="changeDefaultAddressHandler"
        @cancelChanges="cancelChangesHandler"
      />
    </div>
    <div class="address-liner__wrapper" v-else>
      <AddressLinesHolder
        v-for="address in addresses"
        :key="address.id"
        :id="address.id"
        :streetName="address.streetName"
        :building="address.building"
        :apartment="address.apartment"
        :postalCode="address.postalCode"
        :city="address.city"
        :country="address.country"
        :isAddressDefault="defaultAddressId === address.id"
        @manageAddresses="editAddressesHandler"
      />
    </div>
    <AddressForm
      v-if="isAddressAddModeOn"
      :close-event-name="EVENT_NAMES.MANAGE_ADDRESSES"
      :id="newAddressId"
      :block-name="blockName"
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
import { useUserStore } from '@/stores/User'
import { editAddress } from '@/services/apiMethods/user/editAddress'
import { addNewAddress } from '@/services/apiMethods/user/addNewAddress'

export default {
  name: 'AddressBlock',

  components: { AddressForm, AddElementCard, AddressLinesHolder },

  props: {
    title: String,
    blockName: {
      type: String,
      required: true
    },
    addresses: Array<Address>,
    defaultAddressId: String,
    textToAddButton: String
  },

  data() {
    return {
      userStore: useUserStore(),
      isAddressEditModeOn: false,
      isAddressAddModeOn: false,
      newAddressId: String(Date.now())
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
        this.isAddressAddModeOn = false
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
              this.isAddressAddModeOn = false
            }
          } catch (error) {
            this.$emit('commonError')
          }
      }
    },
    async editAddressesHandler(
      eventType: string,
      city?: string,
      street?: string,
      building?: string,
      apartment?: string,
      postCode?: string
    ) {
      if (eventType === EVENT_TYPE_NAMES.PROFILE_EVENTS.MANAGE_ADDRESSES.CHANGE_VIEW_TO_EDIT) {
        this.isAddressEditModeOn = true
        this.isAddressAddModeOn = false
      } else {
        if (city && street && building && apartment && postCode) {
          try {
            const result = await editAddress(
              this.version,
              '',
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
            this.$emit('commonError')
          }
        }
      }
    },
    changeDefaultAddressHandler(id: string, isDefault: string) {
      this.$emit('changeDefaultAddress', id, isDefault)
    },
    cancelChangesHandler() {
      this.isAddressEditModeOn = false
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
