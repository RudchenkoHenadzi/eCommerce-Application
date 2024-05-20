<script lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'

export default {
  name: 'App',
  components: { TheHeader, RouterView }
}
</script>

<template>
  <TheHeader />
  <main>
    <RouterView />
  </main>
</template>

<style lang="scss" scoped></style>
