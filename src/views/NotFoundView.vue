<template>
  <div class="page">
    <div class="page__message">Страница не найдена!</div>
    <button @click="goToMainPage" class="page__btn">На главную</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NotFoundView',

  methods: {
    goToMainPage() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.page {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 30px;
  padding: 0 0 100px;
  height: 95vh;
  width: 100%;
  background: url('@/assets/images/404.jpg') center center/ cover no-repeat;
  box-sizing: border-box;

  &__message {
    padding: 10px;
    border-radius: 10px;
    background-color: white;
  }

  &__btn {
    padding: 5px 8px;
    border: 1px solid $color-darkpurple;
  }
}
</style>
