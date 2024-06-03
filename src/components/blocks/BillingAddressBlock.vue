<template>
  <h2>Платежные адреса</h2>
  <AddressLinesHolder
    v-for="address in addresses"
    :key="address.id"
    :streetName="address.streetName"
    :building="address.building"
    :apartment="address.apartment"
    :postalCode="address.postalCode"
    :city="address.city"
    :country="address.country"
    :isAddressDefault="true"
  />
</template>

<script lang="ts">
import AddressLinesHolder from '@/components/blocks/AddressLinesHolder.vue'
import type { Address } from '@commercetools/platform-sdk'

export default {
  name: 'BillingAddressBlock',
  components: { AddressLinesHolder },
  props: {
    addresses: Array<Address>
  }
}
</script>

<style scoped lang="scss"></style>
