<template>
  <div class="cart">
    <h1 class="cart__title">Корзина</h1>
    <div v-for="lineItem in lineItems" class="cart__list-items" :key="lineItem.id">
      <CartLineItem :lineItem="lineItem" />
    </div>
    <div class="cart__buttons">
      <button class="cart__btn button-purple" @click="goToCatalog">Выбрать товары</button>
      <button v-if="lineItems.length !== 0" class="cart__btn button-purple" @click="makeOrder">
        Оформить заказ
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { useCartsStore } from '@/stores/Carts';
import CartLineItem from '@/components/blocks/CartLineItem.vue';
import type { LineItem } from '@commercetools/platform-sdk';
import { TIMEOUT_SHORT_MESSAGE } from '@/constants/constants';

export default {
  name: 'CartShoppingView',

  components: { CartLineItem },

  data() {
    return {
      cartsStore: useCartsStore()
    };
  },

  methods: {
    makeOrder() {
      this.$emit('showAlert', 'заказ сделан, спасибо', TIMEOUT_SHORT_MESSAGE);
    },
    goToCatalog() {
      this.$router.push('/catalog');
    }
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

  &__buttons {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    gap: 5px;
  }

  &__btn {
    padding: 5px 0;
    width: 40%;
  }
}
</style>
