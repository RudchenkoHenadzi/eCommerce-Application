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
import InputName from '@/components/form-elements/text-inputs/InputName.vue'
import InputLastName from '@/components/form-elements/text-inputs/InputLastName.vue'
import InputDate from '@/components/form-elements/text-inputs/InputDate.vue'
import InputEmail from '@/components/form-elements/text-inputs/InputEmail.vue'
import DoneIcon from '@/Icons/DoneIcon.vue'
import { useUserStore } from '@/stores/User'

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
    }
  },

  methods: {
    switchEditMode() {
      this.userStore.setUserFirstName(this.firstName)
      this.userStore.setUserLastName(this.lastName)
      this.userStore.setUserBirthDate(this.birthDate)
      this.userStore.setUserMail(this.email)
      this.$emit('editModeOff', this.firstName, this.lastName, this.birthDate, this.email)
    }
  },

  mounted() {
    this.firstName = this.userStore.firstName
    this.lastName = this.userStore.lastName
    this.birthDate = this.userStore.birthDate
    this.email = this.userStore.email
  },

  computed: {
    userFirstName: {
      get(): string {
        return this.firstName
      },
      set(newFirstName: string) {
        this.firstName = newFirstName
      }
    },
    userLastName: {
      get(): string {
        return this.lastName
      },
      set(newLastName: string) {
        this.lastName = newLastName
      }
    },
    userBirthDate: {
      get(): string {
        return this.birthDate
      },
      set(newBirthDate: string) {
        this.birthDate = newBirthDate
      }
    },
    userEmail: {
      get(): string {
        return this.email
      },
      set(newEmail: string) {
        this.email = newEmail
      }
    }
  }
}
</script>

<style scoped lang="scss"></style>
