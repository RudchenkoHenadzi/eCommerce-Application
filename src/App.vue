<script lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import apiRootStore from '@/stores/ApiRootStore'

export default {
  name: 'App',
  components: { TheHeader, RouterView },
  mounted() {
    apiRootStore.getToken()
  }
}
</script>

<template>
  <TheHeader />
  <main>
    <RouterView />
  </main>
</template>

<style lang="scss" scoped></style>
