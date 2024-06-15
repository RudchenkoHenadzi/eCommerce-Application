<template>
  <div class="content__prices prices">
    <div class="prices__discount discount" v-if="discountedPrice">
      <div class="discount__standard">{{ productCentAmount }} {{ currencyCode }}</div>
      <div class="discount__actual">{{ discountedPrice }} {{ currencyCode }}</div>
    </div>
    <div class="prices__standard standard" v-else>
      <div class="standard__price">{{ productCentAmount }} {{ currencyCode }}</div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PricesBlock',

  props: {
    discountedPrice: Number,
    productCentAmount: Number,
    currencyCode: String
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.discount {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  &__standard {
    color: $color-gray-600;
    text-decoration: line-through;
  }
}
</style>
