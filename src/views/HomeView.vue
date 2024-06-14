<template>
  <div class="main-page">
    <h1 class="main-page__title">Главная страница</h1>
    <AlreadyInCartButton />
    <div class="switch">
      <p>Сменить страну</p>
      <button @click="changeCountry('GB')">GB</button>
      <button @click="changeCountry('US')">US</button>
      <button @click="changeCountry('DE')">DE</button>
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
  methods: {
    },
    changeCountry(countryCode: TCountryType) {
      this.appSettings.selectCountry(countryCode)
    },
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
