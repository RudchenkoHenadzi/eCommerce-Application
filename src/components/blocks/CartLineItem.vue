<template>
  <div class="line-item">
    <figure class="line-item__image">
      <img :src="productImageSrc" class="line-item__img" :alt="productName" />
    </figure>
    <div class="line-item__name">{{ productName }}</div>
    <div class="line-item__manage">
      <ProductManagementButtons
        :productId="productId"
        :quantity="quantity"
        @deleteItemFromCart="deleteItemFromCartHandler(quantity)"
        @changeQuantity="changeQuantityHandler"
      />
    </div>
    <PricesBlock
      :discountedPrice="
        finalDiscountPrice !== productTotalPrice ? finalDiscountPrice * quantity : 0
      "
      :productCentAmount="productTotalPrice * quantity"
      :currencyCode="currencyCode"
      pricePosition="left"
    />
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import type { LineItem } from '@commercetools/platform-sdk';
import { useAppSettingsStore } from '@/stores/AppSettingsStore';
import { fetchProductById } from '@/services/apiMethods/products/fetchProductById';
import { useAppStatusStore } from '@/stores/AppStatusStore';
import {
  extractProductName,
  extractSrc
} from '@/helpers/extractData/extractProductDataFromProduct';
import {
  extractLineItemIdFromLineItems,
  extractProductQuantityFromLineItems,
  extractFullProductPriceFromLineItem,
  extractActualProductPrice,
  extractDiscountedPriceFromLineItem
} from '@/helpers/extractData/extractProductDataFromLineItems';
import ProductManagementButtons from '@/components/blocks/ProductManagementButtons.vue';
import { addItemToCart, deleteItemFromCart } from '@/services/services/cartServices/cartServices';
import { useCartsStore } from '@/stores/Carts';
import PricesBlock from '@/components/blocks/PricesBlock.vue';
import type { ICartLineItemData } from '@/components/blocks/types/cartLineItemTypes';
import { TIMEOUT_ERROR_MESSAGE } from '@/constants/constants';

export default {
  name: 'CartLineItem',

  components: { PricesBlock, ProductManagementButtons },

  props: {
    lineItem: Object as PropType<LineItem>,
    additionalDiscount: Number,
    isDiscountCodeApplied: Boolean,
    promoCodes: Array
  },

  data(): ICartLineItemData {
    return {
      appSettings: useAppSettingsStore(),
      appStatus: useAppStatusStore(),
      cartsStore: useCartsStore(),
      product: undefined,
      quantity: 0
    };
  },

  methods: {
    async getProductInfo(productId: string) {
      if (productId) {
        try {
          this.appStatus.startLoading();
          const productResult = await fetchProductById(productId);

          if (productResult.statusCode === 200 || productResult.statusCode === 201) {
            this.product = productResult.body;
            this.setQuantity(
              extractProductQuantityFromLineItems(this.product, [this.lineItem as LineItem])
            );
          }
        } catch (error) {
          this.$emit('showAlert', 'Что-то пошло не так', TIMEOUT_ERROR_MESSAGE);
        } finally {
          this.appStatus.stopLoading();
        }
      } else {
        this.$emit('showAlert', 'Что-то пошло не так', TIMEOUT_ERROR_MESSAGE);
      }
    },
    async deleteItemFromCartHandler(quantity: number = 1) {
      try {
        await deleteItemFromCart(
          quantity,
          this.lineItemId,
          this.cartVersion,
          this.productId,
          this.setQuantity
        );
      } catch (e) {
        this.$emit('productCardEvents', 'не удалось удалить товар из корзины4');
      }
    },
    setQuantity(newQuantity: number) {
      this.quantity = newQuantity;
    },
    async changeQuantityHandler(action: string) {
      if (action === 'add') {
        await addItemToCart(this.productId, this.setQuantity);
      } else {
        await this.deleteItemFromCartHandler();
      }
    }
  },

  mounted() {
    this.getProductInfo(this.productId);
  },

  computed: {
    lang() {
      return this.appSettings.lang;
    },
    productId() {
      return this.lineItem ? this.lineItem.productId : '';
    },
    productImageSrc() {
      return this.product ? extractSrc(this.product) : '';
    },
    productName() {
      return this.product ? extractProductName(this.product, this.lang) : '';
    },
    currencyCode() {
      return this.appSettings.currency;
    },
    productTotalPrice() {
      return extractFullProductPriceFromLineItem(this.lineItem);
    },
    productActualPrice() {
      return extractActualProductPrice(this.lineItem);
    },
    discountedPrice(): number {
      return extractDiscountedPriceFromLineItem(this.lineItem); // плед - с двумя промокодами, остальные - с одним промокодм
    },
    finalDiscountPrice() {
      if (this.promoCodes?.length !== 0) {
        return this.productPriceWithPromo;
      }
      return this.productActualPrice;
    },
    productPriceWithPromo() {
      if (this.promoCodes && this.promoCodes?.length !== 0) {
        /*return extractProductPriceWithPromo(this.lineItem) * this.quantity;*/
        let productPrice = this.productActualPrice;
        this.promoCodes.forEach((code, index, array) => {
          if (code === 'WARM50') {
            if (array.includes('ALLDISCO50')) {
              productPrice = Math.round(productPrice * 0.75 * 0.5);
            } else {
              productPrice = Math.round(productPrice * 0.5);
            }
          } else {
            if (array.includes('WARM50')) {
              productPrice = Math.round(productPrice * 0.75 * 0.5);
            }
            productPrice = Math.round(productPrice * 0.75);
          }
        });
        return productPrice;
      }
      return extractActualProductPrice(this.lineItem);
    },
    lineItemId() {
      return this.lineItem ? extractLineItemIdFromLineItems(this.productId, [this.lineItem]) : '';
    },
    cartVersion() {
      return this.cartsStore.cartVersion;
    }
  }
};
</script>

<style scoped lang="scss">
.line-item {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-content: center;
  align-items: center;

  &__image {
    width: 100%;
  }

  &__img {
    max-height: 150px;
    max-width: 100%;
  }
}
</style>
