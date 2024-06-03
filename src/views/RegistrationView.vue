<template>
  <div class="auth-page">
    <RegistrationForm @registrationEvents="registrationEventsHandler" />
  </div>
</template>
<script lang="ts">
import RegistrationForm from '@/components/forms/RegistrationForm.vue'
import { MESSAGE_TEXTS } from '@/constants/texts'
import { TIMEOUT_ERROR_MESSAGE, TIMEOUT_REDIRECT, TIMEOUT_SHORT_MESSAGE } from '@/constants/constants'

export default {
  components: {
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
    redirectTo(path: string) {
      this.$router.push(path)
    },
    registrationEventsHandler(errorType: string) {
      switch (errorType) {
        case 'userExists': {
          this.$emit('showAlert', MESSAGE_TEXTS.userExists, TIMEOUT_ERROR_MESSAGE)
          break
        }
        case 'registrationSuccess': {
          this.$emit('showAlert', MESSAGE_TEXTS.successRegistration, TIMEOUT_SHORT_MESSAGE)

          setTimeout(() => {
            this.redirectTo('/')
          }, TIMEOUT_REDIRECT)
          break
        }
        case 'errorInvalidInput': {
          this.$emit('showAlert', MESSAGE_TEXTS.errorInvalidInput, TIMEOUT_ERROR_MESSAGE)
          break
        }
        default: {
          this.$emit('showAlert', MESSAGE_TEXTS.commonError, TIMEOUT_ERROR_MESSAGE)
        }
      }
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
