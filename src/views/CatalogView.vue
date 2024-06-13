<template>
  <div class="catalog">
    <h1>Страница каталога</h1>
    <div class="products">
      <div class="product-card" v-for="product in products" :key="product.id">
        <ProductCard
          :productName="product.masterData.current.name[lang]"
          :description="getDescription(product)"
          :src="getSrc(product)"
          :attributes="getAttributes(product)"
          :prices="getPrices(product)"
          :productId="product.id"
          label-name=""
        />
      </div>
    </div>
    <div class="loading-message" v-if="isProductsLoading">Идет загрузка</div>
    <div class="observer" ref="observer"></div>
  </div>
</template>

<script lang="ts">
import getProducts from '@/services/apiMethods/products/getProducts'
import type {
  ClientResponse,
  Product,
  ProductPagedQueryResponse
} from '@commercetools/platform-sdk'
import ProductCard from '@/components/cards/ProductCard.vue'
import { useAppSettingsStore } from '@/stores/AppSettingsStore'
import { firstLetterUppercase } from '@/helpers/transformation/stringTransform'
import { PRODUCTS_LIMIT_PER_LOAD } from '@/constants/projectConfigs'
import filterProducts from '@/helpers/extractData/filterProducts'

export default {
  name: 'CatalogView',

  components: { ProductCard },

  data() {
    return {
      products: new Array<Product>(),
      appSettings: useAppSettingsStore(),
      pageNumber: 0,
      totalItems: 0,
      isProductsLoading: false
    }
  },

  methods: {
    async getProducts() {
      this.isProductsLoading = true
      try {
        const products: ClientResponse<ProductPagedQueryResponse> = await getProducts(
          this.pageNumber
        )

        if (this.products.length < 1) {
          this.products = filterProducts(products.body.results)
        } else {
          this.products = [...this.products, ...filterProducts(products.body.results)]
        }

        this.totalItems = products.body.total || this.products.length
      } catch (error) {
        this.$emit('commonError')
      } finally {
        this.isProductsLoading = false
      }
    },
    getPrices(product: Product) {
      const prices = product.masterData.current.masterVariant.prices
      let selectedPrice = {}
      if (prices) {
        prices.forEach((priceData) => {
          if (priceData.value.currencyCode === this.currency) {
            selectedPrice = priceData
          }
        })
      }
      return selectedPrice
    },
    getSrc(product: Product) {
      return product.masterData.current.masterVariant.images
        ? product.masterData.current.masterVariant.images[0]?.url
        : ''
    },
    getDescription(product: Product) {
      return product.masterData.current.description
        ? product.masterData.current.description[this.lang]
        : ''
    },
    getAttributes(product: Product) {
      const rawAttributes = product.masterData.current.masterVariant.attributes
      if (rawAttributes) {
        return rawAttributes.reduce((acc: Record<string, string>[], attribute) => {
          if (attribute.name === 'productspec') {
            let label = []
            if (attribute.value.label) {
              label = attribute.value.label[this.lang]
                .split('-')
                .filter((val: string) => val.trim() !== '')
                .map((val: string) => val.trim())
            } else if (attribute.value) {
              label = attribute.value[this.lang]
                .split('-')
                .filter((val: string) => val.trim() !== '')
                .map((val: string) => firstLetterUppercase(val.trim()))
            }
            label.forEach((labelItem: string) => {
              const formattedAttr = {
                name: attribute.name,
                key: `${attribute.value.key}-${labelItem}` || '',
                label: labelItem || ''
              }
              acc.push(formattedAttr)
            })
          } else if (attribute.name === 'color-filter') {
            let label = ''
            if (attribute.value.label) {
              label = attribute.value.label[this.lang]
            } else {
              label = attribute.value[this.lang]
            }
            if (label.charAt(0) !== '#') {
              const formattedAttr = {
                name: attribute.name,
                key: `${attribute.value.key}` || '',
                label: label || ''
              }
              acc.push(formattedAttr)
            }
          } else if (attribute.name === 'finish') {
            let label = ''
            if (attribute.value.label) {
              label = attribute.value.label[this.lang]
            } else {
              label = attribute.value[this.lang]
            }
            if (label.charAt(0) !== '#') {
              const formattedAttr = {
                name: attribute.name,
                key: `${attribute.value.key}` || '',
                label: label || ''
              }
              acc.push(formattedAttr)
            }
          } else if (attribute.name === 'finishlabel') {
            let label = ''
            if (attribute.value.label) {
              label = attribute.value.label[this.lang]
            } else {
              label = attribute.value[this.lang]
            }
            if (label.charAt(0) !== '#') {
              const formattedAttr = {
                name: attribute.name,
                key: `${attribute.value.key}` || '',
                label: label || ''
              }
              acc.push(formattedAttr)
            }
          } else if (attribute.name === 'color') {
            let label = ''
            if (attribute.value.label) {
              label = attribute.value.label[this.lang]
            } else {
              label = attribute.value[this.lang]
            }
            if (label.charAt(0) !== '#') {
              const formattedAttr = {
                name: attribute.name,
                key: `${attribute.value.key}` || '',
                label: label || ''
              }
              acc.push(formattedAttr)
            }
          } else {
            acc.push({})
          }
          return acc.filter((value) => Object.keys(value).length > 0)
        }, [])
      } else {
        return []
      }
    },
    loadProducts() {
      this.pageNumber += 1
      if (this.pageNumber <= this.totalPages) {
        this.getProducts()
      }
    },
    intersectionHandler(entries: IntersectionObserverEntry[]) {
      if (entries[0].isIntersecting) {
        this.loadProducts()
      }
    }
  },

  mounted() {
    this.getProducts()
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    const observer = new IntersectionObserver(this.intersectionHandler, options)
    observer.observe(this.$refs.observer as Element)
  },

  computed: {
    lang() {
      return this.appSettings.lang
    },
    currency() {
      return this.appSettings.currency
    },
    totalPages() {
      return Math.ceil(this.totalItems / PRODUCTS_LIMIT_PER_LOAD)
    }
  }
}
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
