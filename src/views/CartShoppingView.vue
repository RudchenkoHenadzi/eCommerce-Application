<template>
  <div class="cart">
    <h1>Корзина</h1>
    <div v-for="lineItem in lineItems" class="cart__list-items" :key="lineItem.id">
      <CartLineItem :lineItem="lineItem" />
    </div>
  </div>
</template>

<script lang="ts">
import { useCartsStore } from '@/stores/Carts';
import CartLineItem from '@/components/blocks/CartLineItem.vue';
import type { LineItem } from '@commercetools/platform-sdk';

export default {
  name: 'CartShoppingView',
  components: { CartLineItem },

  data() {
    return {
      cartsStore: useCartsStore()
    };
  },

  computed: {
    lineItems(): LineItem[] {
      return this.cartsStore.currentCart ? this.cartsStore.currentCart.lineItems : [];
    }
  }
};
</script>

<style lang="scss" scoped>
.cart {
  padding: 20px;
  text-align: center;
}
</style>
