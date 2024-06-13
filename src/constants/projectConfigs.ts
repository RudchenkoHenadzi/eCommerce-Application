import type { TCurrencyType, TLang } from '@/types/appSettingsTypes'

const PROJECT_CONFIG = {
  projectKey: 'scooters-online-shop',
  authURL: 'https://auth.europe-west1.gcp.commercetools.com',
  apiURL: 'https://api.europe-west1.gcp.commercetools.com',
  clientID: '17Vsg4Fd0B6R5uyQSpyFBtSg',
  secret: 'VO58PKAJnBSMr-KR6dWv99ifl1gBlkdV',
  scopes: [
    'manage_project:scooters-online-shop manage_api_clients:scooters-online-shop view_api_clients:scooters-online-shop'
  ]
}

const DEFAULT_LANG: TLang = 'en-US'
const APP_LANGUAGES: TLang[] = ['de', 'en-US', 'en-GB']
const DEFAULT_CURRENCY: TCurrencyType = 'USD'
const APP_CURRENCIES: TCurrencyType[] = ['USD', 'GBP', 'EUR']
const AGE_RESTRICTION = 13
const PRODUCTS_LIMIT_PER_LOAD = 20

export default PROJECT_CONFIG
export { AGE_RESTRICTION, DEFAULT_LANG, DEFAULT_CURRENCY, APP_LANGUAGES, APP_CURRENCIES, PRODUCTS_LIMIT_PER_LOAD }
