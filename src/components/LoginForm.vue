<template>
  <form class="form login-form" @submit.prevent="submitLoginForm()">
    <div class="form__title">Вход</div>
    <div class="form__wrapper">
      <InputEmail v-model="loginForm.email" />
      <InputPassword v-model="loginForm.password" />
    </div>
    <button type="submit" class="form__btn button-white">Войти</button>
    <RouterLink class="form__switch" to="/registration">Зарегистрироваться</RouterLink>
  </form>
</template>

<script lang="ts">
import axios from 'axios'
import useValidate from '@vuelidate/core'
import InputEmail from '@/components/form-elements/InputEmail.vue'
import InputPassword from '@/components/form-elements/InputPassword.vue'
import { useToken } from '@/stores/token'

export default {
  name: 'LoginForm',

  components: {
    InputEmail,
    InputPassword
  },

  setup() {
    const piniaToken = useToken()
    return {
      v$: useValidate(),
      piniaToken
    }
  },

  data() {
    return {
      loginForm: {
        email: 'grudchenko93@yandex.by',
        password: 'HH0HH0HHf7SS'
      }
    }
  },

  methods: {
    async submitLoginForm() {
      const result = await this.v$.$validate()

      if (result) {
        axios
          .post(
            `https://auth.europe-west1.gcp.commercetools.com/oauth/hook/customers/${this.piniaToken.token}`,
            this.loginForm,
            {
              headers: {
                Authorization: `Basic  ${this.piniaToken.token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
          )
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
          })
        console.log('В форме ошибок нет, можем отправлять')
      } else {
        console.log('В форме есть ошибки')
      }
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
