<template>
  <div class="auth-form">
    <LoginForm
      @switch-form="activeForm = 'registration-form'"
      v-if="activeForm === 'login-form'"
      @loginAction="login"
    />
    <RegistrationForm @switch-form="activeForm = 'login-form'" v-else />
  </div>
</template>

<script lang="ts">
import LoginForm from '@/components/forms/LoginForm.vue'
import RegistrationForm from '@/components/forms/RegistrationForm.vue'

export default {
  name: 'AuthorizationForm',

  components: {
    LoginForm,
    RegistrationForm
  },

  data() {
    return {
      activeForm: 'login-form'
    }
  },
  methods: {
    login(loginData: { email: string; password: string }) {
      this.$emit('loginAction', loginData)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables';
@import '@/assets/styles/mixins';
@import '@/assets/styles/extends';

.auth-form {
  width: 100%;
  max-width: 480px;

  &__title {
    text-align: center;
  }
}
</style>
