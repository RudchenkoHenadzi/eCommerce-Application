<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DoneIcon'
})
</script>

<template>
  <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h48v48h-48z" fill="none" />
    <path d="M18 32.34l-8.34-8.34-2.83 2.83 11.17 11.17 24-24-2.83-2.83z" />
  </svg>
</template>

<style scoped lang="scss">
svg {
  height: 20px;
  width: 20px;
  cursor: pointer;
}
</style>
