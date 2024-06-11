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

const DEFAULT_LANG = 'en-US'
const DEFAULT_CURRENCY = 'USD'
const AGE_RESTRICTION = 13
const PRODUCTS_LIMIT_PER_LOAD = 20

export default PROJECT_CONFIG
export { AGE_RESTRICTION, DEFAULT_LANG, DEFAULT_CURRENCY, PRODUCTS_LIMIT_PER_LOAD }

