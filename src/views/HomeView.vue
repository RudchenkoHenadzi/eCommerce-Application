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
  <h1>Главная страница</h1>
  <button @click="goToRegistrationPage" class="main-page__btn">Регистрация</button>
  <button @click="goToLoginPage" class="main-page__btn">Вход</button>
  <button @click="showProjectData" class="main-page__btn">Показать данные проекта</button>
  <button @click="showUsersData" class="main-page__btn">Показать данные юзеров</button>
</template>

<style lang="scss">
@import '@/assets/styles/variables.scss';

.main-page {
  &__btn {
    display: block;
    margin-bottom: 10px;
    padding: 5px 8px;
    border: 1px solid $color-darkpurple;
  }
}
</style>
