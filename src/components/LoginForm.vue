<template>
  <form class="form login-form" @submit.prevent="submitLoginForm()">
    <div class="form__title">Вход</div>
    <div class="form__wrapper">
      <InputEmail v-model.trim="loginForm.email" />
      <InputPassword v-model.trim="loginForm.password" />
    </div>
    <button type="submit" class="form__btn button-white">Войти</button>
    <RouterLink class="form__switch" to="/registration">Зарегистрироваться</RouterLink>
  </form>
</template>

<script lang="ts">
import useValidate from '@vuelidate/core'
import InputEmail from '@/components/form-elements/InputEmail.vue'
import InputPassword from '@/components/form-elements/InputPassword.vue'

export default {
  name: 'LoginForm',

  components: {
    InputEmail,
    InputPassword
  },

  setup() {
    return {
      v$: useValidate()
    }
  },

  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    submitLoginForm() {
      this.$emit('loginAction', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';
@import '@/assets/styles/extends.scss';

.login-form {
  margin-top: 50px;
}
</style>
