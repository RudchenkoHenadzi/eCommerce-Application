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
    <AlreadyInCartButton v-if="isItemInCart" @allItemsDeleted="deleteItemFromCart" />
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
export default {
  name: 'ProductCard',

  components: { AlreadyInCartButton, ArrowLeft, CompareIcon },

  props: ['productName', 'description', 'src', 'attributes', 'prices', 'labelName'],

  data() {
    return {
      appSettingsStore: useAppSettingsStore(),
      isItemInCart: false
    }
  },

  methods: {
    addItemToCart() {
      this.isItemInCart = true
    },
    deleteItemFromCart() {
      this.isItemInCart = false
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
