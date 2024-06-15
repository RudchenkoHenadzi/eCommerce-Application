<template>
  <div class="line-item">
    <figure class="line-item__image">
      <img :src="productImageSrc" class="line-item__img" :alt="productName" />
    </figure>
    <div class="line-item__name">{{ itemName }}</div>
    <div class="line-item__manage">
      <AlreadyInCartButton :productId="productId" :quantity="quantity" />
    </div>
    <div class="line-item__total">
      {{ productTotalPrice }}
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import type { LineItem, Product } from '@commercetools/platform-sdk';
import { useAppSettingsStore } from '@/stores/AppSettingsStore';
import AlreadyInCartButton from '@/components/form-elements/buttons/AlreadyInCartButton.vue';
import { fetchProductById } from '@/services/apiMethods/products/fetchProductById';
import { useAppStatusStore } from '@/stores/AppStatusStore';
import {
  extractProductName,
  extractSrc
} from '@/helpers/extractData/extractProductDataFromProduct';
import type { Store } from 'pinia';
import type {
  IAppStatusActions,
  IAppStatusGetters,
  IAppStatusState
} from '@/stores/types/appStatusTypes';
import type {
  IAppSettingsActions,
  IAppSettingsGetters,
  IAppSettingsState
} from '@/stores/types/appSettingsTypes';
import { extractTotalPriceFromLineItem } from '@/helpers/extractData/extractProductDataFromLineItems';

export default {
  name: 'CartLineItem',
  components: { AlreadyInCartButton },

  props: {
    lineItem: Object as PropType<LineItem>
  },

  data(): {
    appStatus: Store<'appStatus', IAppStatusState, IAppStatusGetters, IAppStatusActions>;
    appSettings: Store<'appSettings', IAppSettingsState, IAppSettingsGetters, IAppSettingsActions>;
    product: undefined | Product;
  } {
    return {
      appSettings: useAppSettingsStore(),
      appStatus: useAppStatusStore(),
      product: undefined
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
    this.getProductInfo(this.productId);
  },

  computed: {
    lang() {
      return this.appSettings.lang;
    },
    itemName() {
      return this.lineItem ? this.lineItem.name[this.lang] : '';
    },
    quantity() {
      return this.lineItem ? this.lineItem.quantity : 0;
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
    }
  }
};
</script>

<style scoped lang="scss"></style>
