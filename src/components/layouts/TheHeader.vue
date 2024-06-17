<template>
  <header :class="{ 'header login': store.isLoggedIn, header: !store.isLoggedIn }">
    <div v-if="store.isLoggedIn" class="header__user user" :class="{ opened: isMoreOpen }">
      <button class="user__name" @click="openMore">{{ 'Hello, ' + store.userMail }}</button>
      <Transition>
        <div v-if="isMoreOpen" class="user__more">
          <RouterLink class="user__link" to="/user">В профиль </RouterLink>
          <button class="user__logout" @click="logout">Выход</button>
        </div>
      </Transition>
    </div>
    <TheNavigation />
    <RouterLink class="header__cart" to="/cart-shopping">
      <CartIcon class="cart__icon" />
      <span v-if="cartsStore.productCount" :key="cartsStore.currentCart?.id">{{
        cartsStore.productCount
      }}</span>
    </RouterLink>
  </header>
</template>

<script lang="ts">
import TheNavigation from '@/components/menu/TheNavigation.vue';
import { useUserStore } from '@/stores/User';
import userLogout from '@/services/apiMethods/auth/userLogout';
import { useAppStatusStore } from '@/stores/AppStatusStore';
import { useCartsStore } from '@/stores/Carts';
import CartIcon from '@/Icons/CartIcon.vue';

export default {
  name: 'TheHeader',

  setup() {
    return {
      store: useUserStore()
    };
  },

  components: {
    CartIcon,
    TheNavigation
  },

  data() {
    return {
      appStatus: useAppStatusStore(),
      userApp: useUserStore(),
      cartsStore: useCartsStore(),
      isMoreOpen: false
    };
  },

  methods: {
    logout() {
      this.appStatus.startLoading();
      userLogout();
      this.cartsStore.deleteCurrentCart();
      this.userApp.logout();
      this.userApp.removeUserMail();
      this.isMoreOpen = false;
      this.$router.push('/');
      this.appStatus.stopLoading();
    },
    openMore() {
      this.isMoreOpen = !this.isMoreOpen;
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/styles/variables';

.header {
  display: grid;
  grid-template-columns: 2fr 1fr;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px;
  background: $color-bachground;

  &.login {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: space-between;
    align-items: center;
    padding: 5px 15px;
    background: $color-bachground;
  }

  &__user-name {
    padding-right: 20px;
  }

  &__logout {
    height: auto;
    font-size: 12px;
  }

  &__cart {
    justify-self: end;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    color: inherit;
    text-decoration: none;
  }
}

.cart__icon {
  padding: 5px;
  height: 25px;
  width: 25px;
}

.user {
  position: relative;
  padding: 10px 20px;

  &.opened {
    background-color: $color-white;
  }

  &__more {
    position: absolute;
    top: 36px;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 10px 20px;
    width: 100%;
    background-color: $color-white;
  }

  &__link {
    color: inherit;
    text-decoration: none;
  }

  &__name {
    height: auto;
  }
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
