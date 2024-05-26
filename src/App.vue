<script lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from '@/components/layouts/TheHeader.vue'
import { useApiRootStore } from '@/stores/ApiRoot'

export default {
  components: { TheHeader, RouterView },
  name: 'App',
  mounted() {
    const apiRoot = useApiRootStore()
    apiRoot.start()
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
