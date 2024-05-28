<template>
  <div class="auth-page">
    <LoginForm @loginAction="login" />
    <Transition>
      <AlertMessage
        v-if="isAlertShow"
        :key="Date.now()"
        :text="alertText"
        @closeAlert="closeAlert"
      />
    </Transition>
  </div>
</template>

<script lang="ts">
import LoginForm from '@/components/forms/LoginForm.vue'
import AlertMessage from '@/components/alerts/AlertMessage.vue'

import { useUserStore } from '@/stores/User'
import { useApiRootStore } from '@/stores/ApiRoot'
import {
  TIMEOUT_ERROR_MESSAGE,
  TIMEOUT_REDIRECT,
  TIMEOUT_SHORT_MESSAGE
} from '@/constants/projectConfigs'

export default {
  components: {
    LoginForm,
    AlertMessage
  },

  data() {
    return {
      isAlertShow: false,
      alertText: ''
    }
  },
  methods: {
    login(loginData: { email: string; password: string }) {
      const { email, password } = loginData
      const apiRoot = useApiRootStore()
      apiRoot
        .checkUserExist(email)
        .then((isUserExist) => {
          if (isUserExist) {
            apiRoot
              .loginUser(email, password)
              .then((response) => {
                if (response.statusCode === 200) {
                  this.showAlert('Вы успешно вошли в учетную запись.', TIMEOUT_SHORT_MESSAGE)
                  const user = useUserStore()
                  user.login()
                  user.setUserMail(email)
                  setTimeout(() => {
                    this.$router.push('/')
                  }, TIMEOUT_REDIRECT)
                } else if (response.statusCode === 400) {
                  this.showAlert(
                    'Неверный пароль. Пожалуйста, исправьте введенный пароль и попробуйте еще раз.',
                    TIMEOUT_ERROR_MESSAGE
                  )
                } else {
                  this.showAlert(
                    'Что-то пошло не так. Повторите попытку позже4.',
                    TIMEOUT_ERROR_MESSAGE
                  )
                }
              })
              .catch((error) => {
                if (error.statusCode === 400) {
                  this.showAlert(
                    'Неверный пароль. Пожалуйста, исправьте введенный пароль и попробуйте еще раз.',
                    TIMEOUT_ERROR_MESSAGE
                  )
                } else {
                  this.showAlert(
                    'Что-то пошло не так. Повторите попытку позже2.',
                    TIMEOUT_ERROR_MESSAGE
                  )
                }
              })
          } else {
            this.showAlert(
              'Такого пользователя не существует. Пожалуйста, исправьте введенный адрес электронной почты и попробуйте еще раз.',
              TIMEOUT_ERROR_MESSAGE
            )
          }
        })
        .catch(() => {
          this.showAlert('Что-то пошло не так. Повторите попытку позже.', TIMEOUT_ERROR_MESSAGE)
        })
    },
    showAlert(text: string, delay: number) {
      this.alertText = text
      this.isAlertShow = true
      setTimeout(() => {
        this.isAlertShow = false
      }, delay)
    },
    closeAlert() {
      this.isAlertShow = false
    },
    successHandler(email: string) {
      const appUser = useUserStore()
      appUser.login()
      appUser.setUserMail(email)
      this.redirectTo('/')
    },
    redirectTo(path: string) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.auth-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 95vh;
  overflow: auto;
  background: $color-pale-purple;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
