<template>
  <header
    class="header"
    :class="{
      login: userApp.isLoggedIn,
      'menu-open': isMobileMenuOpen
    }"
  >
    <BurgerIcon :class="{ 'menu-open': isMobileMenuOpen }" @click="toggleMobileMenu" />

    <div v-if="userApp.isLoggedIn" class="header__account account" :class="{ opened: isMoreOpen }">
      <button class="account__name" @click="openMore">
        {{ 'Hello, ' + userApp.userMail }}
      </button>

      <Transition>
        <div v-if="isMoreOpen" class="account__more">
          <RouterLink class="account__link" to="/user" @click="closeMobileMenuHandler"
            >В профиль
          </RouterLink>
          <button class="account_logout" @click="logout">Выход</button>
        </div>
      </Transition>

      <div class="account__mobile-more">
        <RouterLink class="account__link" to="/user" @click="closeMobileMenuHandler"
          >В профиль
        </RouterLink>
        <button class="account__logout" @click="logout">Выход</button>
      </div>
    </div>

    <TheNavigation class="navigation" @closeMobileMenu="closeMobileMenuHandler" />

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
import BurgerIcon from '@/Icons/BurgerIcon.vue';

export default {
  name: 'TheHeader',

  components: {
    BurgerIcon,
    CartIcon,
    TheNavigation
  },

  data() {
    return {
      appStatus: useAppStatusStore(),
      userApp: useUserStore(),
      cartsStore: useCartsStore(),
      isMoreOpen: false,
      isMobileMenuOpen: false
    };
  },

  methods: {
    logout() {
      this.appStatus.startLoading();
      this.cartsStore.deleteCurrentCart();
      this.userApp.logout();
      this.userApp.removeUserMail();
      this.isMoreOpen = false;
      this.closeMobileMenuHandler();
      userLogout();
      this.$router.push('/');
      this.appStatus.stopLoading();
    },
    openMore() {
      this.isMoreOpen = !this.isMoreOpen;
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    closeMobileMenuHandler() {
      this.isMobileMenuOpen = false;
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/styles/variables';

.header {
  position: relative;
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

.account {
  position: relative;
  padding: 10px 20px;
  width: 300px;

  &.opened {
    background-color: $color-white;
  }

  &__name {
    height: auto;
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

  &__mobile-more {
    display: none;
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

@media (max-width: 765px) {
  .account {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-left: -300px;
    transition: margin-left 0.3s ease-in-out;
  }

  .header {
    .navigation {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5px;

      * > ul {
        display: block;
        width: 100%;
      }
    }
  }

  .header,
  .header.login {
    grid-template-columns: 2fr 1fr;
    .navigation {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 3;
      margin-left: -310px;
      width: 310px;
      background-color: $color-pale-purple;
      color: $color-white;
      transition: margin-left 0.3s ease-in-out;
    }

    &.menu-open {
      .navigation {
        margin-left: 0;
      }

      .account {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin-top: 50px;
        margin-left: 0;

        &.opened {
          background-color: transparent;
        }

        &__name {
          margin-bottom: 30px;
          color: $color-white;
          font-weight: bold;
          font-size: 1.2rem;
        }

        &__more {
          display: none;
        }

        &__mobile-more {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          gap: 10px;
          color: $color-white;
        }

        &__logout {
          color: $color-white;
        }
      }
    }
  }
}
</style>
