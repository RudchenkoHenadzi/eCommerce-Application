<template>
  <div class="main-page">
    <h1 class="main-page__title">Главная страница</h1>
    <p>Привет! Не успеваем :( Очень сильно просим проверить в четверг T_T Спасибо за понимание!</p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomeView'
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
