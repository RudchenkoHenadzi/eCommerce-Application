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
import { useClient } from '@/stores/client'
import { useUser } from '@/stores/user'

export default {
  name: 'LoginForm',

  components: {
    InputEmail,
    InputPassword
  },

  setup() {
    const piniaToken = useToken()
    const piniaClient = useClient()
    const piniaUser = useUser()
    return {
      v$: useValidate(),
      piniaToken,
      piniaClient,
      piniaUser
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
    async submitLoginForm() {
      const result = await this.v$.$validate()
      const data = new URLSearchParams()
      data.append('grant_type', 'password')
      data.append('username', this.loginForm.email)
      data.append('password', this.loginForm.password)
      const base64Credentials = btoa(
        `${this.piniaClient.clientId}:${this.piniaClient.clientSecret}`
      )

      if (result) {
        axios
          .post(
            `https://auth.europe-west1.gcp.commercetools.com/oauth/hook/customers/token`,
            data,
            {
              headers: {
                Authorization: `Basic  ${base64Credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
          )
          .then((response) => {
            this.piniaUser.setUserToken(response.data.access_token, response.data.refresh_token)

            axios
              .get('https://api.europe-west1.gcp.commercetools.com/hook/me', {
                headers: {
                  Authorization: `Bearer ${this.piniaUser.accessToken}`
                }
              })
              .then((response) => {
                console.log(response)
              })
              .catch((error) => {
                console.log(error)
              })
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
