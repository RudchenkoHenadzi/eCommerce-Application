<template>
  <div class="auth-page">
    <LoginForm @loginEvents="loginEventsHandler" />
  </div>
</template>

<script lang="ts">
import LoginForm from '@/components/forms/LoginForm.vue'
import {
  MESSAGE_TEXTS,
  TIMEOUT_ERROR_MESSAGE,
  TIMEOUT_SHORT_MESSAGE
} from '@/constants/projectConfigs'

export default {
  components: { LoginForm },

  data() {
    return {
      isAlertShow: false,
      alertText: ''
    }
  },
  methods: {
    loginEventsHandler(eventType: string) {
      switch (eventType) {
        case 'invalidPassword': {
          this.$emit('showAlert', MESSAGE_TEXTS.invalidPassword, TIMEOUT_ERROR_MESSAGE)
          break
        }
        case 'userNotExist': {
          this.$emit('showAlert', MESSAGE_TEXTS.userNotExist, TIMEOUT_ERROR_MESSAGE)
          break
        }
        case 'successLogin': {
          this.$emit('showAlert', MESSAGE_TEXTS.successLogin, TIMEOUT_SHORT_MESSAGE)
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
