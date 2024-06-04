<template>
  <div :class="wrapperClasses">
    <div class="address-lines__marker"></div>
    <div class="address-lines__content content">
      <div class="content__country"><span>Страна:</span> {{ country }}</div>
      <div class="content__city"><span>Город:</span> {{ city }}</div>
      <div class="content__postalCode"><span>Индекс:</span> {{ postalCode }}</div>
      <div class="content__streetName"><span>Улица:</span> {{ streetName }}</div>
      <div class="content__building"><span>Дом:</span> {{ building }}</div>
      <div class="content__apartment"><span>Квартира:</span> {{ apartment }}</div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AddressLinesHolder',

  props: {
    streetName: String,
    building: String,
    apartment: String,
    postalCode: String,
    city: String,
    country: String,
    isAddressDefault: Boolean
  },

  data() {
    return {
      wrapperClasses: {
        default: this.isAddressDefault,
        'address-lines': true
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.address-lines {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-template-areas:
    'marker content content content content'
    'marker content content content content'
    'marker content content content content';
  border: 1px dashed $color-gray-200;
  border-radius: 10px;
  background-color: $color-white;
  transition:
    background-color 0.3s ease-in-out,
    border 0.3s ease-in-out;

  &:hover {
    border: 1px dashed $color-gray-600;
    cursor: pointer;
    & .address-lines__marker {
      background-color: #ac8eee;
      cursor: pointer;
    }
  }

  &__marker {
    grid-area: marker;
    width: 30%;
    background-color: transparent;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
    transition: background-color 0.3s ease-in-out;
    &:active {
      background-color: mediumpurple;
      cursor: pointer;
    }
  }

  span {
    font-weight: bold;
  }
}

.content {
  grid-area: content;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  text-align: left;
  padding: 10px;
}

.default {
  border: 1px dashed $color-gray-600;
  border-radius: 10px;

  & .address-lines__marker {
    background-color: mediumpurple;
  }
}
</style>
