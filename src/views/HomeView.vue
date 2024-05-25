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
    }
  }
}
</script>

<template>
  <h1>Главная страница</h1>
  <button @click="showProjectData">Показать данные проекта</button>
  <button @click="showUsersData">Показать данные юзеров</button>
</template>
