<template>
  <header class="header">
    <TheNavigation />

    <div v-if="store.isUserLoggedIn" class="header__user-name">
      {{ 'Hello, ' + store.getUserMail }}
      <button class="header__logout" @click="logout">Выход</button>
    </div>
  </header>
</template>

<script lang="ts">
import TheNavigation from '@/components/menu/TheNavigation.vue'
import { useUserStore } from '@/stores/User'
import { useApiRootStore } from '@/stores/ApiRoot'

export default {
  name: 'TheHeader',
  setup() {
    return {
      store: useUserStore()
    }
  },
  components: {
    TheNavigation
  },
  data() {
    return {}
  },
  methods: {
    logout() {
      const apiRoot = useApiRootStore()
      apiRoot.logoutUser()
      const userApp = useUserStore()
      userApp.logout()
      userApp.removeUserMail()

      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__user-name {
    padding-right: 20px;
  }

  &__logout {
    height: auto;
    font-size: 12px;
  }
}
</style>
