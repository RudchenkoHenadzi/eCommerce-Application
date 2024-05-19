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
    async submitLoginForm() {
      const result = await this.v$.$validate()

      if (result) {
        this.$emit('loginAction', {
          email: this.loginForm.email,
          password: this.loginForm.password
        })
        // this.store.apiRoot.me().login().post({ body: { email: this.loginForm.email, password: this.loginForm.password } })
        /*axios
          .post('https://jsonplaceholder.typicode.com/posts')
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
          })*/

        console.log('В форме ошибок нет, можем отправлять')
      } else {
        console.log('В форме есть ошибки')
        this.$emit('loginAction', {
          email: this.loginForm.email,
          password: this.loginForm.password
        })
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
