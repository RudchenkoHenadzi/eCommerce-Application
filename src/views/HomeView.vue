<template>
  <div class="main-page">
    <h1 class="main-page__title">Главная страница</h1>
    <AlreadyInCartButton />
    <div class="switch">
      <p>Сменить валюту</p>
      <button @click="changeCurrency('GBP')">GBP</button>
      <button @click="changeCurrency('USD')">USD</button>
      <button @click="changeCurrency('EUR')">EUR</button>
    </div>
  </div>
</template>

<script lang="ts">
import AlreadyInCartButton from '@/components/form-elements/buttons/AlreadyInCartButton.vue'
import { useAppSettingsStore } from '@/stores/AppSettingsStore'

export default {
  name: 'HomeView',
  components: { AlreadyInCartButton }
  data() {
    return {
      appSettings: useAppSettingsStore()
    }
  },
    changeCurrency(currencyCode: TCurrencyType) {
      this.appSettings.setNewCurrency(currencyCode)
    },
}
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
