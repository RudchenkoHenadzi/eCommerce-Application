<template>
  <div :class="blockClasses">
    <div class="address-lines__marker"></div>
    <div class="address-lines__content content">
      <div class="content__country"><span>Страна:</span> {{ country }}</div>
      <div class="content__city"><span>Город:</span> {{ city }}</div>
      <div class="content__postalCode"><span>Индекс:</span> {{ postalCode }}</div>
      <div class="content__streetName"><span>Улица:</span> {{ streetName }}</div>
      <div class="content__building"><span>Дом:</span> {{ building }}</div>
      <div class="content__apartment"><span>Квартира:</span> {{ apartment }}</div>
    </div>
    <div class="address-lines__controls">
      <button class="controls__btn" @click="switchEditModeOn">
        <PencilIcon class="svg-icon" />
      </button>
      <button class="controls__btn">
        <TrashIcon class="svg-icon" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import TrashIcon from '@/Icons/TrashIcon.vue';
import PencilIcon from '@/Icons/PencilIcon.vue';
import { EVENT_NAMES, EVENT_TYPE_NAMES } from '@/constants/constants';

export default {
  name: 'AddressLinesHolder',
  components: { PencilIcon, TrashIcon },

  props: {
    id: String,
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
      blockClasses: {
        default: this.isAddressDefault,
        'address-lines': true
      }
    };
  },

  methods: {
    switchEditModeOn() {
      this.$emit(
        EVENT_NAMES.MANAGE_ADDRESSES,
        EVENT_TYPE_NAMES.PROFILE_EVENTS.MANAGE_ADDRESSES.CHANGE_VIEW_TO_EDIT,
        this.id
      );
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.address-lines {
  display: grid;
  grid-template-columns: 60px repeat(4, 1fr) 40px;
  grid-template-rows: repeat(3, 50px);
  grid-template-areas:
    'marker content content content content controls'
    'marker content content content content controls'
    'marker content content content content controls';
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
  grid-template-rows: repeat(3, 50px);
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

.controls {
  grid-area: controls;
  &__btn {
    .svg-icon {
      padding: 10px;
      height: 30px;
      width: 30px;
    }
  }
}
</style>
