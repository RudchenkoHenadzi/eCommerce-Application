<template>
  <div class="main-page">
    <h1 class="main-page__title">Главная страница</h1>
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
}
</style>
