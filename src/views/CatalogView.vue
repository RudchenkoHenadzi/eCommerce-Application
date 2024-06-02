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
          :price="getPrice(product)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import getProducts from '@/services/apiMethods/products/getProducts'
import isFailedResponseType from '@/helpers/dataCheck/isFailedResponseType'
import type { Product } from '@commercetools/platform-sdk'
import ProductCard from '@/components/cards/ProductCard.vue'
import { useAppSettingsStore } from '@/stores/AppSettingsStore'
import { firstLetterUppercase } from '@/helpers/transformation/stringTransform'

export default {
  name: 'CatalogView',
  components: { ProductCard },
  data() {
    return {
      products: new Array<Product>(),
      appSettings: useAppSettingsStore()
    }
  },
  methods: {
    async getProducts() {
      try {
        const products = await getProducts()
        if (isFailedResponseType(products)) {
          this.$emit('commonError')
        } else {
          this.products = products
        }
      } catch (error) {
        this.$emit('commonError')
      }
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
      let isColorFind = false
      let isFinishFind = false
      if (rawAttributes) {
        return rawAttributes.reduce((acc: Record<string, string>[], attribute) => {
          if (attribute.name === 'productspec') {
            let label = []
            if (attribute.value.label) {
              label = attribute.value.label[this.lang]
                .split('-')
                .filter((val: string) => val.trim() !== '')
                .map((val: string) => val.trim())
            } else {
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
    getPrice(product: Product) {
      const priceArray = product.masterData.current.masterVariant.prices
      if (priceArray) {
        for (let i = 0; i < priceArray?.length; i += 1) {
          if (priceArray[i].value.currencyCode === this.currency) {
            return priceArray[i].value.centAmount
          }
        }
      } else {
        return 'Not available now'
      }
    }
  },
  mounted() {
    this.getProducts()
  },
  computed: {
    lang() {
      return this.appSettings.lang
    },
    currency() {
      return this.appSettings.currency
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
