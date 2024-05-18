<template>
  <header class="header">
    <TheNavigation />
  </header>
</template>

<script lang="ts">
import TheNavigation from '@/components/TheNavigation.vue'

export default {
  name: 'TheHeader',
  components: {
    TheNavigation
  }
}
</script>
