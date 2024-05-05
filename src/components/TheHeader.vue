<template>
  <header class="header">
    <TheNavigation />
  </header>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router'
import TheNavigation from '@/components/TheNavigation.vue'

export default {
  name: 'TheHeader',
  components: {
    TheNavigation
  }
}
</script>
