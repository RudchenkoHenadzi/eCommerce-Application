<template>
  <div class="content__prices prices">
    <div
      class="prices__discount discount"
      :class="{ left: pricePosition === 'left' }"
      v-if="discountedPrice"
    >
      <div class="discount__standard">{{ productCentAmount }} {{ currencyCode }}</div>
      <div class="discount__actual">{{ discountedPrice }} {{ currencyCode }}</div>
    </div>
    <div class="prices__standard standard" v-else>
      <div class="standard__price" :class="{ left: pricePosition === 'left' }">
        {{ productCentAmount }} {{ currencyCode }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PricesBlock',

  props: {
    discountedPrice: Number,
    productCentAmount: Number,
    currencyCode: String,
    pricePosition: String
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
  padding-right: 30px;

  &.left {
    justify-content: flex-end;
  }

  &__standard {
    color: $color-gray-600;
    text-decoration: line-through;
  }

  &__actual {
    font-weight: bold;
  }
}

.standard {
  &__price {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-right: 30px;
    font-weight: bold;
    &.left {
      justify-content: flex-end;
    }
  }
}
</style>
