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
import LoginForm from '@/components/LoginForm.vue'
import AlertMessage from '@/components/alerts/AlertMessage.vue'

import apiRootStore from '@/stores/ApiRootStore'
import { useUserStore } from '@/stores/User'

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
      apiRootStore.loginUser(email, password, this.showAlert, this.successHandler)
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
