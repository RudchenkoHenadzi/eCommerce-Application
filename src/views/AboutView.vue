<template>
  <div class="about">
    <h1 class="about__title">О нас</h1>

    <h2 class="about__subtitle">
      Мы - команда JS Wizards! Название оказалось говорящим - к концу финального таска наша команда
      практически исчезла 🪄
    </h2>

    <div class="about__members">
      <TeamMemberCard
        v-for="member in MEMEBERS_INFO"
        :key="member.id"
        :src="getFullSrc(member.fileName)"
        :memberBio="member.bio"
        :memberName="member.name"
        :memberRole="member.role"
        :memberGitHubLink="member.githubLink"
      />
    </div>
  </div>
</template>

<script lang="ts">
import TeamMemberCard from '@/components/cards/TeamMemberCard.vue';
import { MEMEBERS_INFO } from '@/constants/projectConfigs';
import { getFullSrc } from '@/helpers/transformation/getFullSrc';

export default {
  name: 'AboutView',

  methods: { getFullSrc },

  computed: {
    MEMEBERS_INFO() {
      return MEMEBERS_INFO;
    }
  },
  components: { TeamMemberCard }
};
</script>

<style lang="scss" scoped>
.about {
  padding: 20px;
  text-align: center;

  &__subtitle {
    margin-bottom: 60px;
    line-height: 1.5;
  }

  &__members {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 15px;
  }
}

@media (max-width: 915px) {
  .about {
    &__members {
      flex-wrap: wrap;
      gap: 25px;
    }
  }
}
</style>
