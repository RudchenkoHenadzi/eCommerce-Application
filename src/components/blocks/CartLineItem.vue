<template>
  <div class="line-item">
    <figure class="line-item__image">
      <img :src="productImageSrc" class="line-item__img" :alt="productName" />
    </figure>
    <div class="line-item__name">{{ itemName }}</div>
    <div class="line-item__manage">
      <ProductManagementButtons
        :productId="productId"
        :quantity="quantity"
        @deleteItemFromCart="deleteItemFromCartHandler(quantity)"
        @changeQuantity="changeQuantityHandler"
      />
    </div>
    <!-- TODO discountedPrice - для корзины со скидкой, функционал пока не реализован-->
    <PricesBlock
      :discountedPrice="0"
      :productCentAmount="productTotalPrice * quantity"
      :currencyCode="currencyCode"
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
  extractTotalPriceFromLineItem
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
    lineItem: Object as PropType<LineItem>
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
    itemName() {
      return this.lineItem ? this.lineItem.name[this.lang] : '';
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
      return this.lineItem ? extractTotalPriceFromLineItem(this.lineItem) : 0;
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
