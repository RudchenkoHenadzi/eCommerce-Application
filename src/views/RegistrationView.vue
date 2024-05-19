<template>
  <div class="auth-page">
    <RegistrationForm />
  </div>
</template>
<script lang="ts">
import RegistrationForm from '@/components/RegistrationForm.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    RegistrationForm
  },

  data() {
    return {
      activeForm: 'login-form'
    }
  }
})
</script>

<style lang="scss" scoped>
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
