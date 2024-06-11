<template>
  <div class="main-page">
    <h1 class="main-page__title">Главная страница</h1>
    <AlreadyInCartButton />
  </div>
</template>

<script lang="ts">
import AlreadyInCartButton from '@/components/form-elements/buttons/AlreadyInCartButton.vue'

export default {
  name: 'HomeView',
  components: { AlreadyInCartButton }
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
}
</style>
