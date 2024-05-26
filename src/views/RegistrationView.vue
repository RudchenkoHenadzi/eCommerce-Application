<template>
  <div class="auth-page">
    <RegistrationForm
      @successRegistrationEvent="successRegistrationHandler"
      @errorFailedRequest="commonErrorsHandler"
      @errorUserExists="userExistsErrorHandler"
      @errorInvalidInput="errorInvalidInputHandler"
    />
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
import RegistrationForm from '@/components/RegistrationForm.vue'
import AlertMessage from '@/components/alerts/AlertMessage.vue'
import { useUserStore } from '@/stores/User'
import type { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk'
import { timeoutForMessages, timeoutForRedirect } from '@/configs/project-configs'

export default {
  components: {
    AlertMessage,
    RegistrationForm
  },

  data() {
    return {
      activeForm: 'login-form',
      isAlertShow: false,
      alertText: ''
    }
  },
  methods: {
    successRegistrationHandler(userData: { email: string }) {
      const appUser = useUserStore()
      appUser.login()
      appUser.setUserMail(userData.email)
      this.showAlert('Пользователь успешно создан')
      setTimeout(() => {
        this.redirectTo('/')
      }, timeoutForRedirect)
    },
    showAlert(text: string) {
      this.alertText = text
      this.isAlertShow = true
      setTimeout(() => {
        this.isAlertShow = false
      }, timeoutForMessages)
    },
    closeAlert() {
      this.isAlertShow = false
    },
    redirectTo(path: string) {
      this.$router.push(path)
    },
    commonErrorsHandler(errorData: ClientResponse<CustomerSignInResult>) {
      let text = ''
      if (errorData.statusCode && errorData.statusCode === 400) {
        text = 'Пользователь с таким email уже зарегистрирован.'
      } else {
        text = 'Что-то пошло не так. Попробуйте зарегистрироваться позже.'
      }
      this.showAlert(text)
      setTimeout(() => {
        this.closeAlert()
      }, timeoutForMessages)
    },
    userExistsErrorHandler() {
      this.showAlert('Пользователь с таким email уже зарегистрирован.')
      setTimeout(() => {
        this.closeAlert()
      }, timeoutForMessages)
    },
    errorInvalidInputHandler() {
      this.showAlert('Введены некорректные данные. Исправьте данные и попробуйте снова.')
      setTimeout(() => {
        this.closeAlert()
      }, timeoutForMessages)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
.auth-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 95vh;
  overflow: auto;
  background: $color-pale-purple;
}
</style>
