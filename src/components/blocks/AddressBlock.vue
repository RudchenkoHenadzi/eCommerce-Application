<template>
  <div class="addresses profile__content">
    <h2 class="addresses__title">{{ title }}</h2>
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
</template>

<script lang="ts">
import AddressLinesHolder from '@/components/blocks/AddressLinesHolder.vue'
import type { Address } from '@commercetools/platform-sdk'

export default {
  name: 'AddressBlock',

  components: { AddressLinesHolder },

  props: {
    title: String,
    addresses: Array<Address>,
    defaultAddressId: String
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
