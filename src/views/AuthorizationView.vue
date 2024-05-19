<template>
  <div class="auth-page">
    <AuthorizationForm @loginAction="login" />
  </div>
</template>

<script lang="ts">
import AuthorizationForm from '@/components/AuthorizationForm.vue'
import { defineComponent } from 'vue'
import apiRootStore from '@/stores/apiRootStore'
import MyTokenStore from '@/configs/tokenStore'
// import { anonymousApiRoot, authApiRoot } from '@/configs/BuildClient'
export default defineComponent({
  components: { AuthorizationForm },
  setup() {
    return {
    }
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
  align-items: center;
  height: 95vh;
  overflow: auto;
  background: $color-pale-purple;
}
</style>
