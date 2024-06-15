<template>
  <div class="catalog">
    <h1>Страница каталога</h1>
    <div class="products">
      <div class="product-card" v-for="product in products" :key="product.id">
        <ProductCard
          :product="product"
          :inCartNumber="getInCartNumber(product)"
          :lineItemId="getLineItemId(product)"
          labelName=""
        />
      </div>
    </div>
    <div class="loading-message" v-if="isProductsLoading">Идет загрузка</div>
    <div class="observer" ref="observer"></div>
  </div>
</template>

<script lang="ts">
import getProducts from '@/services/apiMethods/products/getProducts';
import type {
  Cart,
  ClientResponse,
  Product,
  ProductPagedQueryResponse
} from '@commercetools/platform-sdk';
import ProductCard from '@/components/cards/ProductCard.vue';
import { useAppSettingsStore } from '@/stores/AppSettingsStore';
import { PRODUCTS_LIMIT_PER_LOAD } from '@/constants/projectConfigs';
import filterProducts from '@/helpers/extractData/filterProducts';
import type { ICatalogViewData } from '@/components/types/catalogViewTypes';
import { useCartsStore } from '@/stores/Carts';
import { useAppStatusStore } from '@/stores/AppStatusStore';
import {
  extractInCartNumber,
  extractLineItemId
} from '@/helpers/extractData/extractProductDataFromProduct';

export default {
  name: 'CatalogView',

  components: { ProductCard },

  data(): ICatalogViewData {
    return {
      products: new Array<Product>(),
      appSettings: useAppSettingsStore(),
      cartsStore: useCartsStore(),
      appStatus: useAppStatusStore(),
      pageNumber: 0,
      totalItems: 0,
      isProductsLoading: false,
    };
  },

  methods: {
    async getProducts() {
      this.appStatus.startLoading();
      try {
        const products: ClientResponse<ProductPagedQueryResponse> = await getProducts(
          this.pageNumber
        );

        if (this.products.length < 1) {
          this.products = filterProducts(products.body.results);
        } else {
          this.products = [...this.products, ...filterProducts(products.body.results)];
        }

        this.totalItems = products.body.total || this.products.length;
      } catch (error) {
        this.$emit('commonError');
      } finally {
        this.appStatus.stopLoading();
      }
    },
    getInCartNumber(product: Product) {
      if (this.userCurrentCart) {
        return extractInCartNumber(product, this.userCurrentCart);
      }
      return 0;
    },
    getLineItemId(product: Product) {
      if (this.userCurrentCart) {
        return extractLineItemId(product.id, this.userCurrentCart);
      }
      return '';
    },
    loadProducts() {
      this.pageNumber += 1;
      if (this.pageNumber <= this.totalPages) {
        this.getProducts();
      }
    },
    intersectionHandler(entries: IntersectionObserverEntry[]) {
      if (entries[0].isIntersecting) {
        this.loadProducts();
      }
    }
  },

  mounted() {
    this.getProducts();
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    };
    const observer = new IntersectionObserver(this.intersectionHandler, options);
    observer.observe(this.$refs.observer as Element);
  },

  computed: {
    lang() {
      return this.appSettings.lang;
    },
    currency() {
      return this.appSettings.currency;
    },
    totalPages() {
      return Math.ceil(this.totalItems / PRODUCTS_LIMIT_PER_LOAD);
    },
    userCurrentCart(): Cart | undefined {
      return this.cartsStore.currentCart
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.catalog {
  text-align: center;
}

.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 500px;
  gap: 1rem;
  padding: 20px;
  width: 100%;
}

.product-card {
  display: grid;
  grid-template-rows: 47% 53%;
  justify-content: stretch;
  align-content: stretch;
  border: 1.5px solid $color-gray-200;
  border-radius: 10px;
}
</style>
