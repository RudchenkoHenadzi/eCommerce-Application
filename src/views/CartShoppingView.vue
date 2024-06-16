<template>
  <div class="cart">
    <h1 class="cart__title">Корзина</h1>
    <div
      v-for="lineItem in cartsStore.currentCart?.lineItems"
      class="cart__list-items"
      :key="lineItem.id"
    >
      <CartLineItem :lineItem="lineItem" />
    </div>
    <div v-if="lineItems.length !== 0" class="cart__total">
      Всего: <span>{{ totalPrice }} {{ currencyCode }}</span>
    </div>

    <div v-if="lineItems.length === 0" class="cart__empty empty">
      <div class="empty__text">Вы ничего не выбрали :(</div>
      <img class="empty__img" src="../assets/images/empty-cart.png" alt="пустая корзина" />
    </div>

    <div class="cart__buttons">
      <button class="cart__btn button-purple" @click="goToCatalog">
        {{ lineItems.length === 0 ? 'Вернуться в каталог' : 'Добавить еще товары' }}
      </button>
      <button v-if="lineItems.length !== 0" class="cart__btn button-purple" @click="makeOrder">
        Оформить заказ
      </button>
    </div>

    <button
      v-if="lineItems.length !== 0"
      class="cart__clear-btn transparent-button"
      @click="clearCart"
    >
      Очистить корзину
    </button>
  </div>
</template>

<script lang="ts">
import { useCartsStore } from '@/stores/Carts';
import CartLineItem from '@/components/blocks/CartLineItem.vue';
import type { Cart, LineItem } from '@commercetools/platform-sdk';
import { TIMEOUT_SHORT_MESSAGE } from '@/constants/constants';
import { useAppSettingsStore } from '@/stores/AppSettingsStore';
import { useAppStatusStore } from '@/stores/AppStatusStore';
import { deleteCart } from '@/services/apiMethods/cart/deleteCart';
import createNewCart from '@/services/apiMethods/cart/createNewCart';

export default {
  name: 'CartShoppingView',

  components: { CartLineItem },

  data() {
    return {
      cartsStore: useCartsStore(),
      appSettings: useAppSettingsStore(),
      appStatus: useAppStatusStore()
    };
  },

  methods: {
    makeOrder() {
      this.$emit('showAlert', 'заказ сделан, спасибо', TIMEOUT_SHORT_MESSAGE);
    },
    goToCatalog() {
      this.$router.push('/catalog');
    },
    async clearCart() {
      if (this.lineItems.length !== 0) {
        try {
          this.appStatus.startLoading();
          const deleteCartResult = await deleteCart(
            this.cartsStore.cartId,
            this.cartsStore.cartVersion
          );

          if (deleteCartResult.statusCode === 200) {
            const createNewCartResult = await createNewCart();

            if (createNewCartResult.statusCode === 201) {
              this.cartsStore.setCurrentCart(createNewCartResult.body);
            } else {
              throw new Error('не удалось создать новую корзину');
            }
          } else {
            throw new Error('не удалось удалить старую корзину');
          }
        } catch (e) {
          console.log(e);
        } finally {
          this.appStatus.stopLoading();
        }
      }
    }
  },

  computed: {
    currentCart(): Cart | undefined {
      return this.cartsStore.currentCart;
    },
    lineItems(): LineItem[] {
      return this.currentCart ? this.currentCart.lineItems : [];
    },
    currencyCode() {
      return this.appSettings.currency;
    },
    totalPrice() {
      return this.cartsStore.totalPrice;
    }
  }
};
</script>

<style lang="scss" scoped>
.cart {
  padding: 20px;
  text-align: center;

  &__total {
    margin: 0 0 30px auto;
    width: 25%;
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1.5rem;

    span {
      text-decoration: underline;
    }
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    margin-bottom: 5px;
    gap: 5px;
  }

  &__btn,
  &__clear-btn {
    padding: 5px 0;
    width: 40%;
  }

  .empty {
    &__img {
      max-width: 30%;
    }
  }
}
</style>
