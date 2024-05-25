<script lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'

export default {
  components: { TheHeader, RouterView },
  name: 'App',
}
</script>

<template>
  <TheHeader />
  <main>
    <RouterView />
  </main>
</template>

<style lang="scss" scoped></style>
