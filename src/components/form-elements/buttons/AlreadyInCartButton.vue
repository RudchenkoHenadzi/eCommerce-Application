<template>
  <div class="already-in-cart-btn button-purple catalog-card-button">
    <button class="already-in-cart-btn__btn" @click="addItem">+</button>
    <p>{{ itemCount }}</p>
    <button class="already-in-cart-btn__btn" @click="deleteItem">-</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AlreadyInCartButton',

  data() {
    return {
      itemCount: 1
    }
  },

  methods: {
    addItem() {
      this.itemCount += 1
    },
    deleteItem() {
      if (this.itemCount <= 1) {
        this.$emit('allItemsDeleted')
      } else {
        this.itemCount -= 1
      }
    }
  }
}
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
