<template>
  <div class="auth-page">
    <LoginForm @loginAction="login" />
  </div>
</template>

<script lang="ts">
import LoginForm from '@/components/LoginForm.vue'

import { defineComponent } from 'vue'
import apiRootStore from '@/stores/apiRootStore'
import MyTokenStore from '@/configs/tokenStore'
// import { anonymousApiRoot, authApiRoot } from '@/configs/BuildClient'
export default defineComponent({
  components: {
    LoginForm
  },

  data() {
    return {}
  },
  methods: {
    login(loginData: { email: string; password: string }) {
      const { email, password } = loginData
      apiRootStore.loginUser(email, password)
    }
  }
})
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
</style>
