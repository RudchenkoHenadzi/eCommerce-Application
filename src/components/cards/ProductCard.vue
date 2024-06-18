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

    <ProductManagementButtons
      v-if="localQuantity !== 0"
      :productId="productId"
      :quantity="localQuantity"
      @deleteItemFromCart="deleteItemFromCartHandler(localQuantity)"
      @changeQuantity="changeQuantityHandler"
    />

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
import { getCartID, isCartExist } from '@/helpers/dataCheck/isCartExist';
import addProductToCart from '@/services/apiMethods/cart/addProductToCart';
import createNewCart from '@/services/apiMethods/cart/createNewCart';
import { useUserStore } from '@/stores/User';
import { useCartsStore } from '@/stores/Carts';
import { useAppStatusStore } from '@/stores/AppStatusStore';
import { getProductQuantity } from '@/helpers/extractData/getProductQuantity';
import { extractLineItemIdFromCart } from '@/helpers/extractData/extractProductDataFromCart';
import PricesBlock from '@/components/blocks/PricesBlock.vue';
import type { Price, Product } from '@commercetools/platform-sdk';
import type { PropType } from 'vue';
import ProductAttributes from '@/components/blocks/ProductAttributes.vue';
import {
  extractDiscountedProductPrice,
  extractProductAttributes,
  extractProductFullPrice,
  extractProductId,
  extractProductName,
  extractProductPricesData,
  extractSrc
} from '@/helpers/extractData/extractProductDataFromProduct';
import ProductManagementButtons from '@/components/blocks/ProductManagementButtons.vue';
import { deleteItemFromCart } from '@/services/services/cartServices/cartServices';

export default {
  name: 'ProductCard',

  components: { ProductManagementButtons, ProductAttributes, PricesBlock, ArrowLeft, CompareIcon },

  props: {
    product: Object as PropType<Product>,
    quantity: Number,
    lineItemId: String,
    labelName: String
  },

  emits: ['changeProductQuantity', 'productCardEvents'],

  data() {
    return {
      appSettingsStore: useAppSettingsStore(),
      appSettings: useAppSettingsStore(),
      user: useUserStore(),
      cartsStore: useCartsStore(),
      appStatus: useAppStatusStore(),
      localLineItemId: this.lineItemId,
      localQuantity: this.quantity
    };
  },

  methods: {
    extractSrc,
    setLineItemId(lineItemId: string) {
      this.localLineItemId = lineItemId;
    },
    setLocalQuantity(newInCartNumber: number) {
      this.localQuantity = newInCartNumber;
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
              this.$emit('changeProductQuantity', addingItemResult.body);

              this.setLineItemId(extractLineItemIdFromCart(this.productId, addingItemResult.body));
              this.setLocalQuantity(
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
              this.$emit('changeProductQuantity', addingItemResult.body);
              this.setLocalQuantity(
                getProductQuantity(addingItemResult.body.lineItems, this.productId)
              );
              this.setLineItemId(extractLineItemIdFromCart(this.productId, addingItemResult.body));
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
    async deleteItemFromCartHandler(quantity: number = 1) {
      try {
        await deleteItemFromCart(
          quantity,
          this.localLineItemId || '',
          this.cartVersion,
          this.productId,
          this.setLocalQuantity
        );
      } catch (e) {
        this.$emit('productCardEvents', 'не удалось удалить товар из корзины3');
      }
    },
    async changeQuantityHandler(action: string) {
      if (action === 'add') {
        await this.addItemToCart();
      } else {
        await this.deleteItemFromCartHandler();
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
      return extractProductPricesData(this.product as Product, this.currency);
    },
    price() {
      return Object.keys(this.currentPriceData).length !== 0
        ? extractProductFullPrice(this.currentPriceData as Price)
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
