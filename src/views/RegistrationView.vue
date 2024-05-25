<template>
  <div class="auth-page">
    <RegistrationForm
      @successRegistrationEvent="successRegistrationAction"
      @failedRequest="commonErrorsHandler"
      @userExists="userExistsErrorHandler"
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
    successRegistrationAction(userData: { email: string }) {
      const appUser = useUserStore()
      appUser.login()
      appUser.setUserMail(userData.email)
      this.showAlert('Пользователь успешно создан')
      setTimeout(() => {
        this.redirectTo('/')
      }, 2300)
    },
    showAlert(text: string) {
      this.alertText = text
      this.isAlertShow = true
      setTimeout(() => {
        this.isAlertShow = false
      }, 3000)
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
      }, 2300)
    },
    userExistsErrorHandler() {
      this.showAlert('Пользователь с таким email уже зарегистрирован.')
      setTimeout(() => {
        this.closeAlert()
      }, 2300)
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
