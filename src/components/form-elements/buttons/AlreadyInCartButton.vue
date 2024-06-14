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

  props: {
    productId: String
  },

  data() {
    return {
      itemCount: 1
    }
  },

  methods: {
    addItem() {
      this.itemCount += 1
      console.log(`productId ${this.productId} count ${this.itemCount}`)
      this.$emit('changeItemCount', this.itemCount)
    },
    deleteItem() {
      if (this.itemCount <= 1) {
        this.itemCount = 0
      } else {
        this.itemCount -= 1
      }
      console.log(`productId ${this.productId} count ${this.itemCount}`)
      this.$emit('changeItemCount', this.itemCount)
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
