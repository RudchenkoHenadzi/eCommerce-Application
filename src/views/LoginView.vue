<template>
  <div class="auth-page">
    <LoginForm @successMessage="successMessage" @errorMessage="errorMessage" />
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
    successMessage(text: string) {
      this.showAlert(text, TIMEOUT_SHORT_MESSAGE)
    },
    errorMessage(text: string) {
      this.showAlert(text, TIMEOUT_ERROR_MESSAGE)
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
