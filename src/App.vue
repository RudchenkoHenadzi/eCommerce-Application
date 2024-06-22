<template>
  <TheHeader />
  <main>
    <RouterView @showAlert="showAlert" />
  </main>
  <Transition>
    <AlertMessage v-if="isAlertShow" :key="Date.now()" :text="alertText" @closeAlert="closeAlert" />
  </Transition>
  <div class="loader-layout" v-if="isLoading">
    <MyLoader fill="#d8d8e6" />
  </div>
</template>

<script lang="ts">
import { RouterView } from 'vue-router';
import TheHeader from '@/components/layouts/TheHeader.vue';
import { useApiRootStore } from '@/stores/ApiRootStore';
import AlertMessage from '@/components/alerts/AlertMessage.vue';
import { useUserStore } from '@/stores/User';
import { useAppStatusStore } from '@/stores/AppStatusStore';
import MyLoader from '@/Icons/MyLoader.vue';
import getUserCarts from '@/services/apiMethods/cart/getUserCarts';
import { getUserCurrentCart } from '@/helpers/extractData/getCurrentUserCart';
import { useCartsStore } from '@/stores/Carts';

export default {
  components: { MyLoader, AlertMessage, TheHeader, RouterView },

  name: 'App',

  data() {
    return {
      isAlertShow: false,
      alertText: '',
      user: useUserStore(),
      appStatus: useAppStatusStore(),
      apiRoot: useApiRootStore(),
      cartsStore: useCartsStore()
    };
  },

  methods: {
    showAlert(text: string, delay: number) {
      this.alertText = text;
      this.isAlertShow = true;
      setTimeout(() => {
        this.isAlertShow = false;
      }, delay);
    },
    closeAlert() {
      this.isAlertShow = false;
    },
    async getUserCart() {
      try {
        this.appStatus.startLoading();
        const response = await getUserCarts();

        if (response.statusCode === 200 || response.statusCode === 201) {
          const userCart = getUserCurrentCart(response.body.results);
          this.cartsStore.setCurrentCart(userCart);
        } else {
          this.$emit('commonError');
        }
      } catch (error) {
        this.$emit('commonError');
      } finally {
        this.appStatus.stopLoading();
      }
    }
  },

  mounted() {
    this.apiRoot.start();
    this.getUserCart();
  },

  computed: {
    isLoading() {
      return this.appStatus.isDataLoading;
    }
  }
};
</script>

<style lang="scss" scoped>
.loader-layout {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
</style>
