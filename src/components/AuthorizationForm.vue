<template>
  <div class="auth-form">
    <LoginForm @switch-form="activeForm = 'registration-form'" v-if="activeForm === 'login-form'" />
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
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';
@import '@/assets/styles/extends.scss';

.auth-form {
  width: 100%;
  max-width: 380px;

  &__title {
    text-align: center;
  }
}
</style>
