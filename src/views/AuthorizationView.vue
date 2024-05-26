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
  timeoutForErrorMessages,
  timeoutForRedirect,
  timeoutForShortMessages
} from '@/configs/projectConfigs'

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
                  this.showAlert('Вы успешно вошли в учетную запись.', timeoutForShortMessages)
                  const user = useUserStore()
                  user.login()
                  user.setUserMail(email)
                  setTimeout(() => {
                    this.$router.push('/')
                  }, timeoutForRedirect)
                } else {
                  this.showAlert(
                    'Что-то пошло не так. Повторите попытку позже.',
                    timeoutForErrorMessages
                  )
                }
              })
              .catch((error) => {
                if (error.statusCode === 400) {
                  this.showAlert(
                    'Неверный пароль. Пожалуйста, исправьте введенный пароль и попробуйте еще раз.',
                    timeoutForErrorMessages
                  )
                }
              })
          } else {
            this.showAlert(
              'Такого пользователя не существует. Пожалуйста, исправьте введенный адрес электронной почты и попробуйте еще раз.',
              timeoutForErrorMessages
            )
          }
        })
        .catch(() => {
          this.showAlert('Что-то пошло не так. Повторите попытку позже.', timeoutForErrorMessages)
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
