<template>
  <div class="addresses">
    <h2 class="addresses__title">Адреса доставки</h2>
    <AddressLinesHolder
      v-for="address in addresses"
      :key="address.id"
      :streetName="address.streetName"
      :building="address.building"
      :apartment="address.apartment"
      :postalCode="address.postalCode"
      :city="address.city"
      :country="address.country"
      :isAddressDefault="defaultShippingAddressId === address.id"
    />
  </div>
</template>

<script lang="ts">
import AddressLinesHolder from '@/components/blocks/AddressLinesHolder.vue';
import type { Address } from '@commercetools/platform-sdk';

export default {
  name: 'ShippingAddressBlock',
  components: { AddressLinesHolder },
  props: {
    addresses: Array<Address>,
    defaultShippingAddressId: String
  }
};
</script>

<style lang="scss">
.addresses {
  padding: 30px;
  background-color: #eaebed;
  border-radius: 15px;
  box-shadow: 5px 5px 10px darkgray;
}
</style>
