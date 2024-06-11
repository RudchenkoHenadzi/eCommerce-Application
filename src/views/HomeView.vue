<script lang="ts">
export default {
  name: 'HomeView',
  methods: {
    /*showProjectData() {
      const apiRoot = useApiRootStore()
      apiRoot.apiRoot
        .me()
        .get()
        .execute()
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    showUsersData() {
      const apiRoot = useApiRootStore()
      apiRoot.apiRoot
        .products()
        .withKey({ key: 'harmony-drinking-glass' })
        .get()
        /!*.productProjections()
        .search()
        .get({
          queryArgs: {
            filter: 'variants.prices.discounted:exists',
            limit: 20, // The number of products to return
           /!* priceCurrency: 'EUR',*!/
          },
        })*!/
        /!*.search()
        .get({
          queryArgs: {
            filter: `productType.key:"furniture-and-decor"`,
            limit: 20,
          },
        })*!/
        .execute()
        .then((response) => {
          console.log(response)
        })
        .catch((e) => console.log(e))
    },
    goToRegistrationPage() {
      this.$router.push('/registration')
    },
    goToLoginPage() {
      this.$router.push('/authorization')
    }*/
  }
}
</script>

<template>
  <div class="main-page">
    <h1 class="main-page__title">Главная страница</h1>
    <p>Привет! Не успеваем :( Очень сильно просим проверить в четверг T_T Спасибо за понимание!</p>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/variables.scss';

.main-page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  text-align: center;
  &__title {
    margin-bottom: 40px;
  }
  &__btn {
    display: block;
    margin-bottom: 10px;
    padding: 5px 8px;
    border: 1px solid $color-darkpurple;
  }
}
</style>
