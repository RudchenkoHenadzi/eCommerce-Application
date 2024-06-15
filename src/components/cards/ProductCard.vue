<template>
  <div class="product-card__slider slider">
    <img :src="extractSrc(product as Product)" :alt="productName" class="slider__img" />
    <button class="slider__label" v-if="labelName">{{ labelName }}</button>
    <CompareIcon class="slider__compare-btn" />
    <div class="slider__controls controls">
      <button class="controls__btn">
        <ArrowLeft />
      </button>
      <button class="controls__btn">
        <ArrowLeft class="controls__right" />
      </button>
    </div>
  </div>
  <div class="product-card__about about">
    <div class="about__name">{{ productName }}</div>
    <ProductAttributes :attributes="attributes" onlyFirstAttributeVisible="true" />
    <PricesBlock
      :discountedPrice="discountedPrice"
      :currencyCode="currency"
      :productCentAmount="price"
    />

    <div v-if="localInCartNumber !== 0" class="about__manage">
      <AlreadyInCartButton
        @changeItemCount="changeItemCountHandler"
        :productId="productId"
        :item-count="localInCartNumber"
      />
      <button
        class="about__delete-btn button-purple catalog-card-button"
        @click="deleteItemFromCart(inCartNumber)"
      >
        Удалить из корзины
      </button>
    </div>
    <button v-else class="about__btn button-purple catalog-card-button" @click="addItemToCart">
      В корзину
    </button>
    <RouterLink :to="`/product/${productId}`" class="about__more button-purple catalog-card-button"
      >Подробнее</RouterLink
    >
  </div>
</template>

<script lang="ts">
import { useAppSettingsStore } from '@/stores/AppSettingsStore';
import CompareIcon from '@/Icons/CompareIcon.vue';
import ArrowLeft from '@/Icons/ArrowLeft.vue';
import AlreadyInCartButton from '@/components/form-elements/buttons/AlreadyInCartButton.vue';
import { getCartID, isCartExist } from '@/helpers/dataCheck/isCartExist';
import addProductToCart from '@/services/apiMethods/cart/addProductToCart';
import createNewCart from '@/services/apiMethods/cart/createNewCart';
import { useUserStore } from '@/stores/User';
import deleteProductFromCart from '@/services/apiMethods/cart/deleteProductFromCart';
import { useCartsStore } from '@/stores/Carts';
import { useAppStatusStore } from '@/stores/AppStatusStore';
import { getProductQuantity } from '@/helpers/extractData/getProductQuantity';
import {
  extractDiscountedProductPrice,
  extractLineItemId,
  extractProductAttributes,
  extractProductCentAmount,
  extractProductId,
  extractProductName,
  extractProductPrices,
  extractSrc
} from '@/helpers/extractData/extractProductDataFromProduct';
import PricesBlock from '@/components/blocks/PricesBlock.vue';
import type { Price, Product } from '@commercetools/platform-sdk';
import type { PropType } from 'vue';
import ProductAttributes from '@/components/blocks/ProductAttributes.vue';

export default {
  name: 'ProductCard',

  components: { ProductAttributes, PricesBlock, AlreadyInCartButton, ArrowLeft, CompareIcon },

  props: {
    product: Object as PropType<Product>,
    inCartNumber: Number,
    lineItemId: String,
    labelName: String
  },

  emits: ['changeItemsNumberInCart', 'productCardEvents'],

  data() {
    return {
      appSettingsStore: useAppSettingsStore(),
      appSettings: useAppSettingsStore(),
      user: useUserStore(),
      cartsStore: useCartsStore(),
      appStatus: useAppStatusStore(),
      localLineItemId: this.lineItemId,
      localInCartNumber: this.inCartNumber
    };
  },

  methods: {
    extractSrc,
    setLineItemId(lineItemId: string) {
      this.localLineItemId = lineItemId;
    },
    setLocalInCartNumber(newInCartNumber: number) {
      this.localInCartNumber = newInCartNumber;
    },
    async addItemToCart() {
      if (!isCartExist(this.cartId)) {
        try {
          this.appStatus.startLoading();
          const cartCreationResult = await createNewCart();

          if (cartCreationResult.statusCode === 200 || cartCreationResult.statusCode === 201) {
            this.cartsStore.setCurrentCart(cartCreationResult.body);
            const addingItemResult = await addProductToCart(
              cartCreationResult.body.id,
              this.productId,
              cartCreationResult.body.version
            );

            if (addingItemResult.statusCode === 200) {
              this.$emit('changeItemsNumberInCart', addingItemResult.body);

              this.setLineItemId(extractLineItemId(this.productId, addingItemResult.body));
              this.setLocalInCartNumber(
                getProductQuantity(addingItemResult.body.lineItems, this.productId)
              );
              this.cartsStore.setCurrentCart(addingItemResult.body);
            } else {
              this.$emit('productCardEvents', 'Товар не удалось добавить в корзину.');
            }
          } else {
            this.$emit(
              'productCardEvents',
              'Товар не удалось добавить в корзину. Не была создана корзина.'
            );
          }
        } catch (e) {
          this.$emit('productCardEvents', 'Что-то пошло не так.');
        } finally {
          this.appStatus.stopLoading();
        }
      } else {
        try {
          this.appStatus.startLoading();
          const cartId = this.cartsStore.currentCart?.id;
          const cartVersion = this.cartsStore.currentCart?.version;

          if (cartId && cartVersion) {
            const addingItemResult = await addProductToCart(cartId, this.productId, cartVersion);

            if (addingItemResult.statusCode === 200) {
              this.$emit('changeItemsNumberInCart', addingItemResult.body);
              this.setLocalInCartNumber(
                getProductQuantity(addingItemResult.body.lineItems, this.productId)
              );
              this.setLineItemId(extractLineItemId(this.productId, addingItemResult.body));
              this.cartsStore.setCurrentCart(addingItemResult.body);
            } else {
              this.$emit('productCardEvents', 'Товар не удалось добавить в корзину.');
            }
          } else {
            this.$emit('productCardEvents', 'Что-то пошло не так.');
          }
        } catch (e) {
          this.$emit('productCardEvents', 'Что-то пошло не так.');
        } finally {
          this.appStatus.stopLoading();
        }
      }
    },
    async deleteItemFromCart(quantity: number = 1) {
      const cartId = this.cartsStore.userCurrentCart ? this.cartsStore.userCurrentCart.id : '';
      if (cartId) {
        try {
          this.appStatus.startLoading();
          const deletingProductResult = await deleteProductFromCart(
            cartId,
            this.localLineItemId || '',
            this.cartVersion,
            quantity
          );

          if (deletingProductResult.statusCode === 200) {
            this.cartsStore.setCurrentCart(deletingProductResult.body);
            this.setLocalInCartNumber(
              getProductQuantity(deletingProductResult.body.lineItems, this.productId)
            );
          }
        } catch (error) {
          this.$emit('productCardEvents', 'не удалось удалить товар из корзины1');
        } finally {
          this.appStatus.stopLoading();
        }
      } else {
        this.$emit('productCardEvents', 'не удалось удалить товар из корзины');
      }
    },
    async changeItemCountHandler(action: string) {
      if (action === 'add') {
        await this.addItemToCart();
      } else {
        await this.deleteItemFromCart();
      }
    }
  },

  computed: {
    currency() {
      return this.appSettingsStore.currency;
    },
    lang() {
      return this.appSettings.lang;
    },
    currentPriceData() {
      return extractProductPrices(this.product as Product, this.currency);
    },
    price() {
      return Object.keys(this.currentPriceData).length !== 0
        ? extractProductCentAmount(this.currentPriceData as Price)
        : 0;
    },
    discountedPrice() {
      return Object.keys(this.currentPriceData).length !== 0
        ? extractDiscountedProductPrice(this.currentPriceData as Price)
        : 0;
    },
    cartVersion() {
      return this.cartsStore.currentCart ? this.cartsStore.currentCart.version : 0;
    },
    cartId() {
      return getCartID();
    },
    attributes() {
      return extractProductAttributes(this.product as Product, this.lang);
    },
    productId() {
      return extractProductId(this.product as Product);
    },
    productName() {
      return extractProductName(this.product as Product, this.lang);
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.slider {
  position: relative;

  &__img {
    height: 200px;
    max-width: 100%;
    object-fit: contain;
  }

  &__label {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 4px 9px;
    height: auto;
    background-color: $color-orange-main;
    border-radius: 5px;
    color: $color-white;
  }

  &__compare-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    height: auto;
  }

  &__controls {
    position: absolute;
    top: 0;
    left: 0;
  }
}

.controls {
  position: absolute;
  top: 50%;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3px;
  transform: translateY(-50%);
  width: 100%;

  &__btn {
    height: 40px;
    width: 40px;
    border-radius: 100%;
    background-color: $color-gray-200;

    &:active {
      box-shadow: 0 0 5px $color-pale-purple;
    }
  }

  &__right {
    transform: rotate(180deg);
  }
}

.about {
  display: grid;
  grid-template-rows: 20px 1fr 20px 50px;
  align-content: center;
  gap: 10px;
  padding: 20px 24px;
  background: #f0f1f5;
  text-align: left;
  cursor: pointer;

  &__name {
    margin-bottom: 20px;
    font-weight: 600;
    font-size: 18px;
    color: $color-black;
  }

  &__btn {
    width: 100%;
  }

  &__more {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-decoration: none;
  }

  &__manage {
    display: grid;
    grid-template-columns: 5fr 1fr;
    gap: 3px;

    & > * {
      width: 100%;
    }
  }

  &__delete-btn {
    padding: 5px;
    font-size: 0.7em;
  }
}

.attributes {
  overflow: hidden;
}

.discount {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  &__full-price {
    color: $color-gray-600;
    text-decoration: line-through;
  }
}
</style>
