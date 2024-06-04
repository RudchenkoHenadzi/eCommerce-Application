<template>
  <div class="auth-page">
    <LoginForm
      @successLogin="successMessage"
      @commonError="commonError"
      @invalidPassword="invalidPassword"
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
import LoginForm from '@/components/forms/LoginForm.vue'
import AlertMessage from '@/components/alerts/AlertMessage.vue'

import {
  ERROR_MESSAGE_TEXTS,
  TIMEOUT_ERROR_MESSAGE,
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
    successMessage() {
      this.showAlert(ERROR_MESSAGE_TEXTS.successLogin, TIMEOUT_SHORT_MESSAGE)
    },
    commonError() {
      this.showAlert(ERROR_MESSAGE_TEXTS.commonError, TIMEOUT_ERROR_MESSAGE)
    },
    invalidPassword() {
      this.showAlert(ERROR_MESSAGE_TEXTS.invalidPassword, TIMEOUT_ERROR_MESSAGE)
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
