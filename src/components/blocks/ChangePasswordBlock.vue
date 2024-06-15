<template>
  <div class="change-password profile__content">
    <h1 class="change-password__title">Изменить пароль</h1>
    <form class="change-password__form" @submit.prevent="changePassword">
      <InputPassword
        id="change-password-current"
        class="change-password__input transparent-input"
        v-model="currentPassword"
        label-name="Старый пароль:"
      />
      <InputPassword
        id="change-password-new"
        class="change-password__input transparent-input"
        v-model="newPassword"
        label-name="Новый пароль:"
      />
      <InputConfirmPassword
        id="change-password-confirm"
        class="change-password__input transparent-input"
        v-model="confirmNewPassword"
        :password-to-compare="newPassword"
        label-name="Повторите новый пароль:"
      />
      <button class="change-password__btn button-purple" type="submit">Изменить</button>
    </form>
  </div>
</template>

<script lang="ts">
import InputPassword from '@/components/form-elements/text-inputs/InputPassword.vue';
import useValidate from '@vuelidate/core';
import InputConfirmPassword from '@/components/form-elements/text-inputs/InputConfirmPassword.vue';
import { changePassword } from '@/services/apiMethods/user/changePassword';
import { useUserStore } from '@/stores/User';
import { EVENT_NAMES, EVENT_TYPE_NAMES } from '@/constants/constants';
import { useApiRootStore } from '@/stores/ApiRootStore';
import { useAppStatusStore } from '@/stores/AppStatusStore';

export default {
  name: 'ChangePasswordBlock',

  components: { InputConfirmPassword, InputPassword },

  setup() {
    return {
      v$: useValidate()
    };
  },

  data() {
    return {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      userStore: useUserStore(),
      apiRoot: useApiRootStore(),
      appStatus: useAppStatusStore()
    };
  },

  methods: {
    async changePassword() {
      const result = await this.v$.$validate();
      if (result) {
        if (this.currentPassword !== this.newPassword) {
          try {
            this.appStatus.startLoading();
            const changeResult = await changePassword(
              this.version,
              this.currentPassword,
              this.newPassword
            );
            if (changeResult.statusCode === 200) {
              this.apiRoot.createAuthApiRoot(this.email, this.newPassword);
              this.$emit(
                EVENT_NAMES.CHANGE_PASSWORD,
                EVENT_TYPE_NAMES.PROFILE_EVENTS.CHANGE_PASSWORD.SUCCESS
              );
            } else {
              this.$emit(EVENT_NAMES.CHANGE_PASSWORD, EVENT_TYPE_NAMES.COMMON_EVENTS.COMMON_ERROR);
            }
          } catch (e) {
            if (
              typeof e === 'object' &&
              e !== null &&
              'message' in e &&
              e.message === 'The given current password does not match.'
            ) {
              this.$emit(
                EVENT_NAMES.CHANGE_PASSWORD,
                EVENT_TYPE_NAMES.PROFILE_EVENTS.CHANGE_PASSWORD.WRONG_PASSWORD
              );
            } else {
              this.$emit(EVENT_NAMES.CHANGE_PASSWORD, EVENT_TYPE_NAMES.COMMON_EVENTS.COMMON_ERROR);
            }
          } finally {
            this.appStatus.stopLoading();
          }
        } else {
          this.$emit(
            EVENT_NAMES.CHANGE_PASSWORD,
            EVENT_TYPE_NAMES.PROFILE_EVENTS.CHANGE_PASSWORD.THE_SAME_PASSWORDS
          );
        }
      } else {
        this.$emit(EVENT_NAMES.CHANGE_PASSWORD, EVENT_TYPE_NAMES.COMMON_EVENTS.INVALID_INPUT);
      }
    }
  },

  computed: {
    version() {
      return this.userStore.userVersion;
    },
    email() {
      return this.userStore.email;
    }
  }
};
</script>

<style scoped lang="scss">
.change-password {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  padding: 10px;

  &__btn {
    margin-top: 25px;
    padding: 5px 0;
    width: 100%;
  }
}
</style>
