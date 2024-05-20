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
import LoginForm from '@/components/LoginForm.vue'
import RegistrationForm from '@/components/RegistrationForm.vue'

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
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';
@import '@/assets/styles/extends.scss';

.auth-form {
  width: 100%;
  max-width: 480px;

  &__title {
    text-align: center;
  }
}
</style>
