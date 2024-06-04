<template>
  <div class="user">
    <figure class="user__avatar">
      <img class="user__img" src="@/assets/images/avatar.jpg" alt="avatar" />
      <figcaption>
        Avatar image from
        <a
          href="https://www.freepik.com/free-vector/collection-people-carrying-shopping-bags_4946623.htm#fromView=search&page=1&position=1&uuid=2b06f85c-4786-457a-9e68-48ea85acb683"
          >freepik</a
        >
      </figcaption>
    </figure>
    <EditUserDataForm
      v-if="isEditModeOn"
      @editModeOff="editModeOffHandler"
      :firstName="firstName"
      :lastName="lastName"
      :birthDate="birthDate"
      :email="email"
    />
    <AboutUserDataBlock v-else @editModeOn="editModeOnHandler" />
  </div>
</template>

<script lang="ts">
import EditUserDataForm from '@/components/forms/EditUserDataForm.vue'
import AboutUserDataBlock from '@/components/blocks/AboutUserDataBlock.vue'
import { updateUserData } from '@/services/apiMethods/user/updateUserData'
import { useUserStore } from '@/stores/User'
import { USER_PROFILE_EVENTS } from '@/constants/constants'
import { ERROR_TEXTS } from '@/constants/texts'

export default {
  name: 'UserDataBlock',

  components: { AboutUserDataBlock, EditUserDataForm },

  props: {
    firstName: String,
    lastName: String,
    email: String,
    birthDate: String
  },

  data() {
    return {
      isEditModeOn: false,
      userStore: useUserStore()
    }
  },

  methods: {
    editModeOffHandler(firstName: string, lastName: string, birthDate: string, email: string) {
      this.isEditModeOn = false
      updateUserData(this.version, firstName, lastName, birthDate, email)
        .then((response) => {
          if (response.statusCode === 200) {
            this.userStore.setUserVersion(response.body.version)
            this.$emit(USER_PROFILE_EVENTS.DATA_CHANGE.SUCCESS)
          } else {
            this.$emit(USER_PROFILE_EVENTS.DATA_CHANGE.DUPLICATE_DATA)
          }
        })
        .catch((error) => {
          if (error.message === ERROR_TEXTS.DUPLICATED_DATA) {
            this.$emit(USER_PROFILE_EVENTS.DATA_CHANGE.DUPLICATE_DATA)
          } else {
            this.$emit(USER_PROFILE_EVENTS.DATA_CHANGE.ERROR)
          }
        })
    },
    editModeOnHandler() {
      this.isEditModeOn = true
    }
  },

  computed: {
    version() {
      return this.userStore.version
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.user {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-template-areas: 'pic about about';
  padding: 50px;
  background-color: #eaebed;
  border-radius: 15px;
  box-shadow: 5px 5px 10px darkgray;

  &__avatar {
    grid-area: pic;
    margin: 0;
    width: 90%;
  }

  &__img {
    margin-bottom: 15px;
    width: 100%;
  }
}

.about {
  position: relative;
  grid-area: about;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  padding: 15px;
  background-color: $color-white;
  border-radius: 10px;

  &__name span,
  &__lastName span,
  &__birthDate span,
  &__email span {
    font-weight: bold;
  }

  &__edit-btn,
  &__done-btn {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
