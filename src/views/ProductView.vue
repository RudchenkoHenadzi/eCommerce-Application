<template>
  <div class="product">
    <h1 class="product__name">{{ productName }}</h1>
    <div class="product__info info">
      <figure class="info__image">
        <img :src="productImageSrc" class="info__img" :alt="productName" />
      </figure>

      <div class="info__content content">
        <div class="content__description">{{ productDescription }}</div>

        <div class="content__attributes">
          <ProductAttributes :attributes="attributes" />
        </div>

        <PricesBlock
          :discountedPrice="discountedPrice"
          :currencyCode="currencyCode"
          :productCentAmount="productCentAmount"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getProductIdFromParams } from '@/helpers/extractData/getProductIdFromParams';
import { getProductById } from '@/services/apiMethods/products/getProductById';
import type { Price, Product } from '@commercetools/platform-sdk';
import { useAppStatusStore } from '@/stores/AppStatusStore';
import type { Store } from 'pinia';
import type {
  IAppStatusActions,
  IAppStatusGetters,
  IAppStatusState
} from '@/stores/types/appStatusTypes';
import { useAppSettingsStore } from '@/stores/AppSettingsStore';
import type { IAppSettingsGetters, IAppSettingsState } from '@/stores/types/appSettingsTypes';
import {
  extractDiscountedProductPrice,
  extractProductAttributes,
  extractProductCentAmount,
  extractProductDescription,
  extractProductName,
  extractProductPrices,
  extractSrc
} from '@/helpers/extractData/extractProductDataFromProduct';
import PricesBlock from '@/components/blocks/PricesBlock.vue';
import ProductAttributes from '@/components/blocks/ProductAttributes.vue';

export default {
  name: 'ProductView',

  components: { PricesBlock, ProductAttributes },

  data(): {
    appStatus: Store<'appStatus', IAppStatusState, IAppStatusGetters, IAppStatusActions>;
    appSettings: Store<'appSettings', IAppSettingsState, IAppSettingsGetters, {}>;
    productId: string;
    product: undefined | Product;
  } {
    return {
      appStatus: useAppStatusStore(),
      appSettings: useAppSettingsStore(),
      productId: '',
      product: undefined
    };
  },

  methods: {
    async getProductInfo(productId: string) {
      if (productId) {
        try {
          this.appStatus.startLoading();
          const productResult = await getProductById(productId);

          if (productResult.statusCode === 200 || productResult.statusCode === 201) {
            this.product = productResult.body;
          }
        } catch (error) {
          this.$emit('showAlert', 'Что-то пошло не так');
        } finally {
          this.appStatus.stopLoading();
        }
      } else {
        this.$emit('showAlert', 'Что-то пошло не так');
      }
    }
  },

  mounted() {
    this.productId = getProductIdFromParams(this.$route.params);
    this.getProductInfo(this.productId);
  },

  computed: {
    lang() {
      return this.appSettings.lang;
    },
    currencyCode() {
      return this.appSettings.currency;
    },
    productName() {
      return this.product ? extractProductName(this.product, this.lang) : '';
    },
    productDescription() {
      return this.product ? extractProductDescription(this.product, this.lang) : '';
    },
    productImageSrc() {
      return this.product ? extractSrc(this.product) : '';
    },
    productPriceData() {
      return this.product ? extractProductPrices(this.product, this.currencyCode) : {};
    },
    productCentAmount() {
      return Object.keys(this.productPriceData).length !== 0
        ? extractProductCentAmount(this.productPriceData as Price)
        : 0;
    },
    discountedPrice() {
      return Object.keys(this.productPriceData).length !== 0
        ? extractDiscountedProductPrice(this.productPriceData as Price)
        : 0;
    },
    attributes() {
      return this.product ? extractProductAttributes(this.product, this.lang) : {};
    }
  }
};
</script>

<style lang="scss" scoped>
.product {
  padding: 20px;
  width: 100%;

  &__name {
    margin-bottom: 35px;
    text-align: center;
  }
}

.info {
  display: grid;
  grid-template-columns: 40% 60%;
  gap: 15px;
  width: 100%;

  &__image {
    margin: 0;
    width: 100%;
  }

  &__img {
    max-width: 100%;
  }
}

.content {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  &__description {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__attributes {
    margin: 25px 0 15px;
  }
}

.standard {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  font-weight: bold;
}
</style>
