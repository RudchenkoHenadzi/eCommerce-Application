<template>
  <div class="manage">
    <AlreadyInCartButton
      @changeQuantity="changeQuantityHandler"
      :productId="productId"
      :quantity="quantity"
    />
    <button
      class="manage__delete-btn button-purple catalog-card-button"
      @click="deleteItemFromCart"
    >
      Удалить из корзины
    </button>
  </div>
</template>

<script lang="ts">
import AlreadyInCartButton from '@/components/form-elements/buttons/AlreadyInCartButton.vue';

export default {
  name: 'ProductManagementButtons',

  components: { AlreadyInCartButton },

  props: {
    productId: String,
    quantity: Number
  },

  methods: {
    changeQuantityHandler(action: string) {
      this.$emit('changeQuantity', action);
    },
    deleteItemFromCart() {
      this.$emit('deleteItemFromCart');
    }
  }
};
</script>

<style scoped lang="scss">
.manage {
  display: grid;
  grid-template-columns: 5fr 1fr;
  gap: 3px;

  & > * {
    width: 100%;
  }

  &__delete-btn {
    padding: 5px;
    font-size: 0.7em;
  }
}
</style>
