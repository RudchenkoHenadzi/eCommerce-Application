<template>
  <div class="team-member">
    <figure>
      <img :src="src" :alt="memberName" />
      <figcaption>{{ memberName }}</figcaption>
    </figure>

    <div class="team-member__name">{{ memberName }}</div>
    <div class="team-member__role">{{ memberRole }}</div>
    <div class="team-member__bio">{{ memberBio }}</div>
    <a :href="memberGitHubLink" class="team-member__github">Ссылка на GitHub</a>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TeamMemberCard',

  props: {
    src: String,
    memberName: String,
    memberRole: String,
    memberBio: String,
    memberGitHubLink: String
  }
};
</script>

<style scoped lang="scss"></style>
