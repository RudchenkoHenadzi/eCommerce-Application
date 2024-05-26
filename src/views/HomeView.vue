<script lang="ts">
import { useApiRootStore } from '@/stores/ApiRoot'

export default {
  name: 'HomeView',
  methods: {
    showProjectData() {
      const apiRoot = useApiRootStore()
      apiRoot.apiRoot
        ?.get()
        .execute()
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    showUsersData() {
      const apiRoot = useApiRootStore()
      apiRoot.apiRoot
        .customers()
        .get()
        .execute()
        .then((res) => console.table(res.body.results))
        .catch((error) => {
          console.log(error)
        })
    },
    goToRegistrationPage() {
      this.$router.push('/registration')
    },
    goToLoginPage() {
      this.$router.push('/authorization')
    }
  }
}
</script>

<template>
  <div class="main-page">
    <h1 class="main-page__title">Главная страница</h1>
    <button @click="goToRegistrationPage" class="main-page__btn">Регистрация</button>
    <button @click="goToLoginPage" class="main-page__btn">Вход</button>
    <button @click="showProjectData" class="main-page__btn">
      Показать в консоли данные проекта
    </button>
    <button @click="showUsersData" class="main-page__btn">Показать в консоли данные юзеров</button>
  </div>
</template>

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
