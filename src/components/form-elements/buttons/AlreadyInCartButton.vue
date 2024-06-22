<template>
  <div class="already-in-cart-btn button-purple catalog-card-button">
    <button class="already-in-cart-btn__btn" @click="addItem">+</button>
    <p>{{ quantity }}</p>
    <button class="already-in-cart-btn__btn" @click="deleteItem">-</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AlreadyInCartButton',

  props: {
    productId: String,
    quantity: Number
  },

  methods: {
    addItem() {
      this.$emit('changeQuantity', 'add');
    },
    deleteItem() {
      this.$emit('changeQuantity', 'delete');
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.already-in-cart-btn {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;

  &__btn {
    width: 100%;
    color: $color-white;
  }
}
</style>
