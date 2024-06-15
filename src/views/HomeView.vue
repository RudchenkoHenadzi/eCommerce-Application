<template>
  <div class="main-page">
    <h1 class="main-page__title">Главная страница</h1>
    <button @click="getUserCart()">Проверить корзины</button>
    <div class="switch">
      <p>Сменить страну</p>
      <button @click="changeCountry('GB')">GB</button>
      <button @click="changeCountry('US')">US</button>
      <button @click="changeCountry('DE')">DE</button>
    </div>
  </div>
</template>

<script lang="ts">
import getUserCarts from '@/services/apiMethods/cart/getUserCarts';
import type { TCountryType } from '@/types/appSettingsTypes';
import { useAppSettingsStore } from '@/stores/AppSettingsStore';

export default {
  name: 'HomeView',
  data() {
    return {
      appSettings: useAppSettingsStore()
    };
  },
  methods: {
    getUserCart() {
      getUserCarts().then(console.log).catch(console.error);
    },
    changeCountry(countryCode: TCountryType) {
      this.appSettings.selectCountry(countryCode);
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/styles/variables.scss';

.main-page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  text-align: center;

  &__title {
    margin-bottom: 40px;
  }

  &__btn {
    display: block;
    margin-bottom: 10px;
    padding: 5px 8px;
    border: 1px solid $color-darkpurple;
  }

  .switch button {
    margin-right: 15px;
  }
}
</style>
