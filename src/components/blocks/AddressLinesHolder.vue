<template>
  <div :class="wrapperClasses">
    <div class="country">Страна: {{ country }}</div>
    <div class="city">Город: {{ city }}</div>
    <div class="postalCode">Индекс: {{ postalCode }}</div>
    <div class="streetName">Улица: {{ streetName }}</div>
    <div class="building">Дом: {{ building }}</div>
    <div class="apartment">Квартира: {{ apartment }}</div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AddressLinesHolder',
  props: {
    streetName: String,
    building: String,
    apartment: String,
    postalCode: String,
    city: String,
    country: String,
    isAddressDefault: Boolean
  },
  data() {
    return {
      wrapperClasses: {
        default: this.isAddressDefault,
        'address-lines__wrapper': true
      }
    }
  }
}
</script>

<style scoped lang="scss">
.default {
  border: 3px solid #d21e1e;
}
</style>
