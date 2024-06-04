<template>
  <div class="user__about about">
    <div class="about__name"><span>Имя: </span> {{ firstName }}</div>
    <div class="about__lastName"><span>Фамилия: </span> {{ lastName }}</div>
    <div class="about__birthDate"><span>Дата рождения: </span> {{ birthDate }}</div>
    <div class="about__email"><span>Email: </span> {{ email }}</div>
    <PencilIcon class="about__done-btn" @click="switchEditMode" />
  </div>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/User'
import PencilIcon from '@/Icons/PencilIcon.vue'

export default {
  name: 'AboutUserDataBlock',

  components: { PencilIcon },

  data() {
    return {
      userStore: useUserStore()
    }
  },

  methods: {
    switchEditMode() {
      this.$emit('editModeOn')
    }
  },

  computed: {
    firstName() {
      return this.userStore.firstName
    },
    lastName() {
      return this.userStore.lastName
    },
    birthDate() {
      return this.userStore.birthDate
    },
    email() {
      return this.userStore.email
    }
  }
}
</script>

<style scoped lang="scss"></style>
