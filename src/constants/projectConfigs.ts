import type { TCountryType, TCurrencyType, TLangType } from '@/types/appSettingsTypes';

const PROJECT_CONFIG = {
  projectKey: 'scooters-online-shop',
  authURL: 'https://auth.europe-west1.gcp.commercetools.com',
  apiURL: 'https://api.europe-west1.gcp.commercetools.com',
  clientID: '17Vsg4Fd0B6R5uyQSpyFBtSg',
  secret: 'VO58PKAJnBSMr-KR6dWv99ifl1gBlkdV',
  scopes: [
    'manage_project:scooters-online-shop manage_api_clients:scooters-online-shop view_api_clients:scooters-online-shop'
  ]
};

const DEFAULT_LANG: TLangType = 'en-US';
const APP_LANGUAGES: TLangType[] = ['de-DE', 'en-US', 'en-GB'];
const DEFAULT_CURRENCY: TCurrencyType = 'USD';
const APP_CURRENCIES: TCurrencyType[] = ['USD', 'GBP', 'EUR'];
const DEFAULT_COUNTRY: TCountryType = 'US';
const APP_COUNTRIES: TCountryType[] = ['US', 'GB', 'DE'];
const AGE_RESTRICTION = 13;
const PRODUCTS_LIMIT_PER_LOAD = 20;

const MEMEBERS_INFO = [
  {
    id: 0,
    name: 'Гена',
    role: 'Тим лид',
    fileName: 'Henadzi.jfif',
    bio: 'Действующий разработчик, наш тим лид: он собрал нас вместе, назначал созвоны, распределял задачи, отважно старался разобраться в тоннах моего говнокода и давал дельные советы по его преображению.',
    githubLink: 'https://github.com/rudchenkohenadzi'
  },
  {
    id: 1,
    name: 'Ваня',
    role: 'Разработчик',
    fileName: 'Ivan.jfif',
    bio: 'Наш "коллега-ушедший-в-тень": к сожалению, Ваня не выдеждал запутанности коварного commercetools и покинул нас практически в самом начале 😔',
    githubLink: 'https://github.com/ivankapitula'
  },
  {
    id: 2,
    name: 'Настя',
    role: 'Разработчик',
    fileName: 'Nastya.png',
    bio: 'Человек, который очень хотел сертификат, но профукал его, и, тем не менее, не оставил попыток довести проект до конца.',
    githubLink: 'https://github.com/iamarrow88'
  }
];

export default PROJECT_CONFIG;
export {
  AGE_RESTRICTION,
  DEFAULT_LANG,
  DEFAULT_CURRENCY,
  DEFAULT_COUNTRY,
  APP_LANGUAGES,
  APP_CURRENCIES,
  APP_COUNTRIES,
  PRODUCTS_LIMIT_PER_LOAD,
  MEMEBERS_INFO
};
