<template>
  <form class="form login-form form-purple" @submit.prevent="submitLoginForm()">
    <div class="form__title">Вход</div>
    <div class="form__wrapper">
      <InputEmail v-model.trim="loginForm.email" />
      <InputPassword v-model.trim="loginForm.password" label-name="Пароль:" id="login-password" />
    </div>
    <button type="submit" class="form__btn button-white">Войти</button>
    <RouterLink class="form__switch" to="/registration">Зарегистрироваться</RouterLink>
  </form>
</template>

<script lang="ts">
import InputEmail from '@/components/form-elements/text-inputs/InputEmail.vue';
import InputPassword from '@/components/form-elements/text-inputs/InputPassword.vue';
import userLogin from '@/services/apiMethods/auth/userLogin';
import checkUserExist from '@/services/apiMethods/auth/checkUserExist';
import { useUserStore } from '@/stores/User';
import { isUserNotFound } from '@/helpers/dataCheck/loginCheck';
import { TIMEOUT_REDIRECT } from '@/constants/constants';
import { useAppStatusStore } from '@/stores/AppStatusStore';
import getUserCarts from '@/services/apiMethods/cart/getUserCarts';
import { getUserCurrentCart } from '@/helpers/extractData/getCurrentUserCart';
import { useCartsStore } from '@/stores/Carts';

export default {
  name: 'LoginForm',

  components: {
    InputEmail,
    InputPassword
  },

  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      appStatus: useAppStatusStore(),
      cartsStore: useCartsStore(),
      user: useUserStore()
    };
  },

  methods: {
    async submitLoginForm() {
      this.appStatus.startLoading();
      try {
        const doesUserExist = await checkUserExist(this.loginForm.email);
        if (doesUserExist) {
          try {
            const loginResult = await userLogin(this.loginForm.email, this.loginForm.password);
            if (loginResult.statusCode === 200) {
              this.$emit('loginEvents', 'successLogin');
              this.getUserCart();
              this.user.login();
              this.user.setUserMail(this.loginForm.email);
              setTimeout(() => {
                this.$router.push('/');
              }, TIMEOUT_REDIRECT);
            } else if (loginResult.statusCode === 400) {
              this.$emit('loginEvents', 'invalidPassword');
            } else {
              this.$emit('loginEvents', 'commonError');
            }
          } catch (e) {
            if (isUserNotFound(e)) {
              this.$emit('loginEvents', 'userNotExist');
            } else {
              this.$emit('loginEvents', 'commonError');
            }
          }
        } else {
          this.$emit('loginEvents', 'userNotExist');
        }
      } catch (error: unknown) {
        this.$emit('loginEvents', 'commonError');
      } finally {
        this.appStatus.stopLoading();
      }
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
  }
};
</script>

<style lang="scss" scoped>
.login-form {
  margin-top: 50px;
}
</style>
