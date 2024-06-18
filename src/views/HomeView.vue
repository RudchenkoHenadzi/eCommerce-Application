<template>
  <div class="main-page">
    <h1 class="main-page__title">Главная страница</h1>
    <!--    <button @click="getUserCart()">Проверить корзины</button>-->
    <!--    <button @click="getDiscountCodes()">Получить коды скидок</button>-->
    <div class="switch">
      <p>Сменить страну</p>
      <button @click="changeCountry('GB')">GB</button>
      <button @click="changeCountry('US')">US</button>
      <button @click="changeCountry('DE')">DE</button>
    </div>

    <div class="promo">
      <h2 class="promo__title">Промокоды:</h2>

      <div v-for="discount in discountFullInfo" :key="discount.id" class="promo__code">
        {{ discount.key || '' }}
      </div>

      <p class="promo__more">
        Промокод WARM50 - на серый пред, который находится в самом конце каталога. Промокод
        ALLDISCO25 - скидка на все. Промокоды можно только отдельно применять, одновременно пока не
        осилила xD
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import getUserCarts from '@/services/apiMethods/cart/getUserCarts';
import type { TCountryType } from '@/types/appSettingsTypes';
import { useAppSettingsStore } from '@/stores/AppSettingsStore';
import { useDiscountCodesStore } from '@/stores/DIscountCodesStore';

export default {
  name: 'HomeView',
  data() {
    return {
      appSettings: useAppSettingsStore(),
      discountCodesStore: useDiscountCodesStore(),
      discountCodes: new Array<string>()
    };
  },
  methods: {
    getUserCart() {
      getUserCarts().then(console.log).catch(console.error);
    },
    changeCountry(countryCode: TCountryType) {
      this.appSettings.selectCountry(countryCode);
    }
    /*async getDiscountCodes() {
      const apiRoot = useApiRootStore().apiRoot;
      const res = await apiRoot.cartDiscounts().get().execute();

      if (res.statusCode === 200 || res.statusCode === 201) {
        this.discountCodesStore.setAllDiscountDetails(res.body);
        this.discountCodesStore.setAllDiscountCodes(res.body);
        this.discountCodes = res.body.results.map((promoInfo) => {
          return promoInfo.key || ''
        })
      }
    }*/
  },

  /*mounted() {
    this.getDiscountCodes();
  },*/

  computed: {
    discountFullInfo() {
      return this.discountCodesStore.cartDiscountsDetails;
    }
  }
};

/*
version - body.version;
type = body.value.type === "relative"
discountNumber = body.value.permyriad / 100
name = body.name[lang]
description = body.description[lang]
promo = body.key

* [
  {
    "id": "f612641d-ce5d-4083-b34d-bea69468cc1a",
    "version": 3,
    "versionModifiedAt": "2024-06-17T23:04:35.438Z",
    "lastMessageSequenceNumber": 1,
    "createdAt": "2024-06-17T23:03:55.233Z",
    "lastModifiedAt": "2024-06-17T23:04:35.438Z",
    "lastModifiedBy": {
      "isPlatformClient": true,
      "user": {
        "typeId": "user",
        "id": "c2709e27-2225-4bab-8999-7fe5aa398fb4"
      }
    },
    "createdBy": {
      "isPlatformClient": true,
      "user": {
        "typeId": "user",
        "id": "c2709e27-2225-4bab-8999-7fe5aa398fb4"
      }
    },
    "value": {
      "type": "relative",
      "permyriad": 2500
    },
    "cartPredicate": "1 = 1",
    "target": {
      "type": "lineItems",
      "predicate": "1 = 1"
    },
    "name": {
      "be": "",
      "en-GB": "",
      "de": "",
      "en-US": "",
      "ru": "Скидки на все!",
      "en": ""
    },
    "description": {
      "be": "",
      "en-GB": "",
      "de": "",
      "en-US": "",
      "ru": "Скидки на все!",
      "en": ""
    },
    "stackingMode": "Stacking",
    "isActive": true,
    "requiresDiscountCode": false,
    "sortOrder": "0.9",
    "references": [],
    "stores": [],
    "key": "ALLDISCO"
  }
]*/
</script>

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

  .switch button {
    margin-right: 15px;
  }
}
</style>
