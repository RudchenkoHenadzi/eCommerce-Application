<template>
  <div class="auth-page">
    <AuthorizationForm />
  </div>
</template>

<script lang="ts">
import AuthorizationForm from '@/components/AuthorizationForm.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { AuthorizationForm },
  data() {
    return {}
  }
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95vh;
  overflow: auto;
  background: $color-pale-purple;
}
</style>
