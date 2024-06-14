<template>
  <div class="product-card__slider slider">
    <img :src="src" :alt="productName" class="slider__img" />
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
    <ul class="about__attributes attributes">
      <li class="attributes__item" v-for="attribute in attributes" :key="attribute.name">
        {{ attribute.label }}
      </li>
    </ul>
    <div class="about__discount discount" v-if="discountedPrice">
      <div class="discount__full-price">{{ price }} {{ currency }}</div>
      <div class="discount__actual-price">{{ discountedPrice }} {{ currency }}</div>
    </div>
    <div class="about__full-price-only full-price-only" v-else>
      <div class="full-price-only__price">{{ price }} {{ currency }}</div>
    </div>
    <AlreadyInCartButton
      v-if="localInCartNumber !== 0"
      @changeItemCount="changeItemCountHandler"
      :productId="productId"
      :item-count="localInCartNumber"
    />
    <button v-else class="about__btn button-purple catalog-card-button" @click="addItemToCart">
      В корзину
    </button>
  </div>
</template>

<script lang="ts">
import { useAppSettingsStore } from '@/stores/AppSettingsStore'
import CompareIcon from '@/Icons/CompareIcon.vue'
import ArrowLeft from '@/Icons/ArrowLeft.vue'
import AlreadyInCartButton from '@/components/form-elements/buttons/AlreadyInCartButton.vue'
import { getCartID, isCartExist } from '@/helpers/dataCheck/isCartExist'
import addProductToCart from '@/services/apiMethods/cart/addProductToCart'
import createNewCart from '@/services/apiMethods/cart/createNewCart'
import { useUserStore } from '@/stores/User'
import { getLineItemId } from '@/helpers/extractData/getLineItemId'
import deleteProductFromCart from '@/services/apiMethods/cart/deleteProductFromCart'
import { useCartsStore } from '@/stores/Carts'
import { useAppStatusStore } from '@/stores/AppStatusStore'
import { getProductQuantity } from '@/helpers/extractData/getProductQuantity'
export default {
  name: 'ProductCard',

  components: { AlreadyInCartButton, ArrowLeft, CompareIcon },

  props: [
    'productName',
    'description',
    'src',
    'attributes',
    'prices',
    'labelName',
    'productId',
    'inCartNumber',
    'lineItemId'
  ],

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
    }
  },

  methods: {
    setLineItemId(lineItemId: string) {
      this.localLineItemId = lineItemId
    },
    setLocalInCartNumber(newInCartNumber: number) {
      this.localInCartNumber = newInCartNumber
    },
    async addItemToCart() {
      if (!isCartExist(this.cartId)) {
        try {
          this.appStatus.startLoading()
          const cartCreationResult = await createNewCart()

          if (cartCreationResult.statusCode === 200) {
            this.cartsStore.setCurrentCart(cartCreationResult.body)
            const addingItemResult = await addProductToCart(
              cartCreationResult.body.id,
              this.productId,
              cartCreationResult.body.version
            )

            if (addingItemResult.statusCode === 200) {
              console.log('добавлено')
              this.$emit('changeItemsNumberInCart', addingItemResult.body)

              this.setLineItemId(getLineItemId(addingItemResult.body.lineItems, this.productId))
              this.setLocalInCartNumber(
                getProductQuantity(addingItemResult.body.lineItems, this.productId)
              )
              this.cartsStore.setCurrentCart(addingItemResult.body)
            } else {
              this.$emit('productCardEvents', 'Товар не удалось добавить в корзину.')
            }
          } else {
            this.$emit(
              'productCardEvents',
              'Товар не удалось добавить в корзину. Не была создана корзина.'
            )
          }
        } catch (e) {
          this.$emit('productCardEvents', 'Что-то пошло не так.')
        } finally {
          this.appStatus.stopLoading()
        }
      } else {
        try {
          this.appStatus.startLoading()
          const cartId = this.cartsStore.currentCart?.id
          const cartVersion = this.cartsStore.currentCart?.version

          if (cartId && cartVersion) {
            const addingItemResult = await addProductToCart(cartId, this.productId, cartVersion)

            if (addingItemResult.statusCode === 200) {
              console.log('добавлено')
              this.$emit('changeItemsNumberInCart', addingItemResult.body)
              this.setLocalInCartNumber(
                getProductQuantity(addingItemResult.body.lineItems, this.productId)
              )
              this.setLineItemId(getLineItemId(addingItemResult.body.lineItems, this.productId))
              this.cartsStore.setCurrentCart(addingItemResult.body)
            } else {
              this.$emit('productCardEvents', 'Товар не удалось добавить в корзину.')
            }
          } else {
            this.$emit('productCardEvents', 'Что-то пошло не так.')
          }
        } catch (e) {
          this.$emit('productCardEvents', 'Что-то пошло не так.')
        } finally {
          this.appStatus.stopLoading()
        }
      }
    },
    async changeItemCountHandler(action: string): void {
      if (action === 'add') {
        this.addItemToCart()
      } else {
        const cartStore = useCartsStore()
        const cartId = cartStore.userCurrentCart ? cartStore.userCurrentCart.id : ''

        if (cartId) {
          try {
            this.appStatus.startLoading()
            const deletingProductResult = await deleteProductFromCart(
              cartId,
              this.localLineItemId,
              this.cartVersion
            )

            if (deletingProductResult.statusCode === 200) {
              this.cartsStore.setCurrentCart(deletingProductResult.body)
              this.setLocalInCartNumber(
                getProductQuantity(deletingProductResult.body.lineItems, this.productId)
              )
            }
            /*deleteProductFromCart(cartId, this.localLineItemId, this.cartVersion)
              .then((res) => {
                console.log(res)
              })
              .catch((e) => {
                console.log(e)
              })*/
          } catch (error) {
            this.$emit('productCardEvents', 'не удалось удалить товар из корзины1')
          } finally {
            this.appStatus.stopLoading()
          }
        } else {
          this.$emit('productCardEvents', 'не удалось удалить товар из корзины')
        }
      }
    }
  },

  computed: {
    currency() {
      return this.appSettingsStore.currency
    },
    price() {
      return this.prices.value.centAmount
    },
    discountedPrice() {
      if (this.prices.discounted) {
        return this.prices.discounted.value.centAmount
      } else {
        return undefined
      }
    },
    cartVersion() {
      return this.cartsStore.currentCart ? this.cartsStore.currentCart.version : 0
    },
    cartId() {
      return getCartID()
    }
  }
}
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
    width: 90%;
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
