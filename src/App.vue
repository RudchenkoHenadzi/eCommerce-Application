<script lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import { useApiRootStore } from '@/stores/CTClient'

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
    <RouterView apiRoot="apiRoot" />
  </main>
</template>

<style lang="scss" scoped></style>
