<template>
  <figure>
    <img class="avatar" src="@/assets/images/avatar.jpg" alt="avatar" />
    <figcaption>
      Avatar image from
      <a
        href="https://www.freepik.com/free-vector/collection-people-carrying-shopping-bags_4946623.htm#fromView=search&page=1&position=1&uuid=2b06f85c-4786-457a-9e68-48ea85acb683"
        >freepik</a
      >
    </figcaption>
  </figure>
  <div class="name"><span>Name: </span> {{ firstName }}</div>
  <div class="lastName"><span>Last Name: </span> {{ lastName }}</div>
  <div class="birthDate"><span>Date of birth: </span> {{ birthDate }}</div>
  <div class="email"><span>Email: </span> {{ email }}</div>
</template>

<script lang="ts">
export default {
  name: 'UserDataBlock',
  props: {
    firstName: String,
    lastName: String,
    email: String,
    birthDate: String
  }
}
</script>

<style scoped lang="scss">
.name span,
.lastName span,
.birthDate span,
.email span {
  font-weight: bold;
}
</style>
