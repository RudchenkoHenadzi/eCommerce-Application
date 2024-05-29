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
import InputEmail from '@/components/form-elements/text-inputs/InputEmail.vue'
import InputPassword from '@/components/form-elements/text-inputs/InputPassword.vue'
import userLogin from '@/services/apiMethods/userLogin'
import checkUserExist from '@/services/apiMethods/checkUserExist'
import { TIMEOUT_REDIRECT } from '@/constants/projectConfigs'
import { useUserStore } from '@/stores/User'

export default {
  name: 'LoginForm',

  components: {
    InputEmail,
    InputPassword
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
      try {
        const doesUserExist = await checkUserExist(this.loginForm.email)
        if (doesUserExist) {
          const loginResult = await userLogin(this.loginForm.email, this.loginForm.password)
          if (loginResult.statusCode === 200) {
            this.$emit('successMessage', 'Вы успешно вошли в учетную запись.')
            const user = useUserStore()
            user.login()
            user.setUserMail(this.loginForm.email)
            setTimeout(() => {
              this.$router.push('/')
            }, TIMEOUT_REDIRECT)
          } else if (loginResult.statusCode === 400) {
            this.$emit(
              'errorMessage',
              'Неверный пароль. Пожалуйста, исправьте введенный пароль и попробуйте еще раз.'
            )
          } else {
            this.$emit('errorMessage', 'Что-то пошло не так. Повторите попытку позже.')
          }
        }
      } catch (error: unknown) {
        this.$emit('errorMessage', 'Что-то пошло не так. Повторите попытку позже.')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-form {
  margin-top: 50px;
}
</style>
