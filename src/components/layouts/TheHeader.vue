<template>
  <header class="header">
    <TheNavigation />
    <div v-if="store.isLoggedIn" class="header__user-name">
      {{ 'Hello, ' + store.userMail }}
      <button class="header__logout" @click="logout">Выход</button>
    </div>
  </header>
</template>

<script lang="ts">
import TheNavigation from '@/components/menu/TheNavigation.vue';
import { useUserStore } from '@/stores/User';
import userLogout from '@/services/apiMethods/auth/userLogout';
import { useAppStatusStore } from '@/stores/AppStatusStore';
import { useCartsStore } from '@/stores/Carts';

export default {
  name: 'TheHeader',

  setup() {
    return {
      store: useUserStore()
    };
  },

  components: {
    TheNavigation
  },

  data() {
    return {
      appStatus: useAppStatusStore(),
      userApp: useUserStore(),
      cartsStore: useCartsStore()
    };
  },

  methods: {
    logout() {
      this.appStatus.startLoading();
      userLogout();
      this.cartsStore.deleteCurrentCart();
      this.userApp.logout();
      this.userApp.removeUserMail();

      this.$router.push('/');
      this.appStatus.stopLoading();
    }
  }
};
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
