<template>
  <div class="auth-page">
    <LoginForm />
  </div>
</template>

<script lang="ts">
import LoginForm from '@/components/LoginForm.vue'

import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    LoginForm
  },

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
  align-items: flex-start;
  height: 95vh;
  overflow: auto;
  background: $color-pale-purple;
}
</style>
