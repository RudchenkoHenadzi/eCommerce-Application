<template>
  <div class="auth-page">
    <RegistrationForm
      @registrationSuccess="successRegistrationHandler"
      @commonError="commonErrorsHandler"
      @userExists="userExistsErrorHandler"
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
import RegistrationForm from '@/components/forms/RegistrationForm.vue'
import AlertMessage from '@/components/alerts/AlertMessage.vue'
import type { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk'
import {
  TIMEOUT_SHORT_MESSAGE,
  TIMEOUT_REDIRECT,
  TIMEOUT_ERROR_MESSAGE,
  ERROR_MESSAGE_TEXTS
} from '@/constants/projectConfigs'

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
    successRegistrationHandler() {
      this.showAlert(ERROR_MESSAGE_TEXTS.successRegistration, TIMEOUT_SHORT_MESSAGE)
      setTimeout(() => {
        this.redirectTo('/')
      }, TIMEOUT_REDIRECT)
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
    redirectTo(path: string) {
      this.$router.push(path)
    },
    commonErrorsHandler(errorData: ClientResponse<CustomerSignInResult>) {
      if (errorData.statusCode && errorData.statusCode === 400) {
        this.userExistsErrorHandler()
      } else {
        this.errorInvalidInputHandler()
      }
    },
    userExistsErrorHandler() {
      this.showAlert(ERROR_MESSAGE_TEXTS.userExists, TIMEOUT_ERROR_MESSAGE)
    },
    errorInvalidInputHandler() {
      this.showAlert(ERROR_MESSAGE_TEXTS.errorInvalidInput, TIMEOUT_ERROR_MESSAGE)
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
