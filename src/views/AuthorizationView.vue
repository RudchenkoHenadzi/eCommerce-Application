<template>
  <div class="auth-page">
    <RegistrationForm v-if="isRegistrationPage" />
    <AuthorizationForm v-else />
  </div>
</template>

<script lang="ts">
import AuthorizationForm from '@/components/AuthorizationForm.vue'
import { defineComponent } from 'vue'
import RegistrationForm from '@/components/RegistrationForm.vue'

export default defineComponent({
  components: { RegistrationForm, AuthorizationForm },
  data() {
    return {
      isRegistrationPage: false
    }
  }
})
</script>

<style scoped lang="scss">
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
</style>
