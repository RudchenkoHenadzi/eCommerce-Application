<template>
  <div class="user__edit edit">
    <InputName v-model="userFirstName" />
    <InputLastName v-model="userLastName" />
    <InputDate v-model="userBirthDate" />
    <InputEmail v-model="userEmail" />
    <DoneIcon @click="switchEditMode" />
  </div>
</template>

<script lang="ts">
import InputName from '@/components/form-elements/text-inputs/InputName.vue';
import InputLastName from '@/components/form-elements/text-inputs/InputLastName.vue';
import InputDate from '@/components/form-elements/text-inputs/InputDate.vue';
import InputEmail from '@/components/form-elements/text-inputs/InputEmail.vue';
import DoneIcon from '@/Icons/DoneIcon.vue';
import { useUserStore } from '@/stores/User';

export default {
  name: 'EditUserDataForm',

  components: { DoneIcon, InputEmail, InputDate, InputLastName, InputName },

  data() {
    return {
      userStore: useUserStore(),
      firstName: '',
      lastName: '',
      birthDate: '',
      email: ''
    };
  },

  methods: {
    switchEditMode() {
      this.$emit('editModeOff', this.firstName, this.lastName, this.birthDate, this.email);
    }
  },

  mounted() {
    this.firstName = this.userStore.firstName;
    this.lastName = this.userStore.lastName;
    this.birthDate = this.userStore.birthDate;
    this.email = this.userStore.email;
  },

  computed: {
    userFirstName: {
      get(): string {
        return this.firstName;
      },
      set(newFirstName: string) {
        this.firstName = newFirstName;
      }
    },
    userLastName: {
      get(): string {
        return this.lastName;
      },
      set(newLastName: string) {
        this.lastName = newLastName;
      }
    },
    userBirthDate: {
      get(): string {
        return this.birthDate;
      },
      set(newBirthDate: string) {
        this.birthDate = newBirthDate;
      }
    },
    userEmail: {
      get(): string {
        return this.email;
      },
      set(newEmail: string) {
        this.email = newEmail;
      }
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/styles/variables';

.edit {
  grid-area: about;
  padding: 15px;
  background-color: $color-white;
  border-radius: 10px;

  .form {
    &__item {
      display: grid;
      grid-template-columns: 1fr 3fr;
      margin-bottom: 15px;
      justify-content: start;
      gap: 10px;
      text-align: left;
    }

    &__label {
      margin: auto 0;
    }

    &__input {
      color: $color-gray-600;
      border: 1px solid $color-gray-600;
      background-color: transparent;
    }
  }
}
</style>
