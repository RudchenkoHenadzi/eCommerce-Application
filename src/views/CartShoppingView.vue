<template>
  <div class="cart">
    <h1 class="cart__title">Корзина</h1>
    <div
      v-for="lineItem in cartsStore.currentCart?.lineItems"
      class="cart__list-items"
      :key="lineItem.id"
    >
      <CartLineItem :lineItem="lineItem" :isDiscountCodeApplied="isDiscountCodeApplied" />
    </div>

    <div class="cart__price-management">
      <div v-if="lineItems.length !== 0" class="cart__prices prices">
        <div v-if="fullPrice !== totalPrice" class="prices__full">
          Без скидки: <span>{{ fullPrice }} {{ currencyCode }}</span>
        </div>
        <div class="prices__total">
          Всего: <span>{{ totalPrice }} {{ currencyCode }}</span>
        </div>
      </div>

      <form
        v-if="lineItems.length !== 0"
        class="cart__discount-codes discount-codes"
        @submit.prevent="applyDiscountCode"
      >
        <InputDiscountCode
          blockName="discountCode"
          v-model="promos.promo1"
          class="discount-codes__input transparent-input"
          @deleteCode="removeDiscount"
        />
        <div v-if="promos.promo1Message" class="discount-codes__message">
          <div class="discount-codes__text">{{ promos.promo1Message }}</div>
          <button @click="removeDiscount" class="discount-codes__delete-btn">
            <DeleteIcon class="icon" />
          </button>
        </div>
        <button type="submit" class="discount-codes__btn button-purple">Применить</button>
      </form>
    </div>

    <div v-if="lineItems.length === 0" class="cart__empty empty">
      <div class="empty__text">Корзина пуста</div>
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
      class="cart__clear-btn button-transparent"
      @click="clearCart"
    >
      Очистить корзину
    </button>
  </div>
</template>

<script lang="ts">
import { useCartsStore } from '@/stores/Carts';
import CartLineItem from '@/components/blocks/CartLineItem.vue';
import type { Cart, CartDiscount, LineItem } from '@commercetools/platform-sdk';
import { TIMEOUT_SHORT_MESSAGE } from '@/constants/constants';
import { useAppSettingsStore } from '@/stores/AppSettingsStore';
import { useAppStatusStore } from '@/stores/AppStatusStore';
import { deleteCart } from '@/services/apiMethods/cart/deleteCart';
import createNewCart from '@/services/apiMethods/cart/createNewCart';
import InputDiscountCode from '@/components/form-elements/text-inputs/InputDiscountCode.vue';
import { useDiscountCodesStore } from '@/stores/DIscountCodesStore';
import { extractDiscountName } from '@/helpers/extractData/discounts/extractDataFromCartDiscount';
import DeleteIcon from '@/Icons/DeleteIcon.vue';
import {
  extractAllProductsFullPriceNoPromo,
  extractAllProductsTotalPriceWithPromo,
  extractAllProductsTotalPriceNoPromo
} from '@/helpers/extractData/extractProductDataFromCart';

export default {
  name: 'CartShoppingView',

  components: { DeleteIcon, InputDiscountCode, CartLineItem },

  data() {
    return {
      cartsStore: useCartsStore(),
      appSettings: useAppSettingsStore(),
      appStatus: useAppStatusStore(),
      discountCodesStore: useDiscountCodesStore(),
      promos: {
        promo1: '',
        promo2: '',
        promo1Message: '',
        promo2Message: ''
      },
      isDiscountCodeApplied: false
    };
  },

  methods: {
    async makeOrder() {
      this.$emit('showAlert', 'Заказ сделан, спасибо', TIMEOUT_SHORT_MESSAGE);
      await this.clearCart();
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
    },
    applyDiscountCode() {
      const discountInfo = this.discountCodesStore.getDiscountInfoByKey(this.promos.promo1);
      this.createPromoMessage(discountInfo);
      this.isDiscountCodeApplied = Boolean(discountInfo);
    },
    createPromoMessage(discountInfo?: CartDiscount) {
      if (discountInfo) {
        this.promos.promo1Message = `Промокод "${extractDiscountName(discountInfo, this.lang)}" успешно применен.`;
      } else {
        this.promos.promo1Message = `Промокод недействителен.`;
      }
    },
    removeDiscount() {
      this.promos.promo1 = '';
      this.promos.promo1Message = '';
      this.isDiscountCodeApplied = false;
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
      return this.isDiscountCodeApplied
        ? extractAllProductsTotalPriceWithPromo(this.cartsStore.currentCart)
        : extractAllProductsTotalPriceNoPromo(this.cartsStore.currentCart);
    },
    fullPrice() {
      return extractAllProductsFullPriceNoPromo(this.cartsStore.currentCart);
    },
    discountCodes() {
      return this.discountCodesStore.discountCodes;
    },
    lang() {
      return this.appSettings.lang;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.cart {
  padding: 20px;
  text-align: center;

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

  &__price-management {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    margin-bottom: 25px;
  }
}

.discount-codes {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5px;
  padding: 5px 10px;
  width: 125%;

  &__input {
    margin-bottom: 5px;
  }

  &__message {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 98%;
  }

  &__delete-btn {
    height: 30px;
    width: 30px;
  }

  &__btn {
    margin: 15px auto 0;
    height: 40px;
    width: 40%;
  }
}

.prices {
  margin: 0 0 30px auto;
  width: 85%;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.5rem;

  &__full {
    padding-right: 30px;
    height: 30px;
    text-align: right;
    font-size: 1rem;
    color: $color-gray-600;
    text-decoration: line-through;
  }

  &__total {
    padding-right: 30px;
    height: 30px;
    text-align: right;
    span {
      font-weight: bold;
      text-decoration: underline;
    }
  }
}

.icon {
  height: 100%;
  width: 100%;
}
</style>
