<template>
  <div class="addresses">
    <h2 class="addresses__title">Платежные адреса</h2>
    <AddressLinesHolder
      v-for="address in addresses"
      :key="address.id"
      :streetName="address.streetName"
      :building="address.building"
      :apartment="address.apartment"
      :postalCode="address.postalCode"
      :city="address.city"
      :country="address.country"
      :isAddressDefault="defaultBillingAddressId === address.id"
    />
  </div>
</template>

<script lang="ts">
import AddressLinesHolder from '@/components/blocks/AddressLinesHolder.vue';
import type { Address } from '@commercetools/platform-sdk';

export default {
  name: 'BillingAddressBlock',
  components: { AddressLinesHolder },
  props: {
    addresses: Array<Address>,
    defaultBillingAddressId: String
  }
};
</script>

<style scoped lang="scss"></style>
