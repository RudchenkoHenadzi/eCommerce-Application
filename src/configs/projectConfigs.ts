const projectConfig = {
  projectKey: 'scooters-online-shop',
  authURL: 'https://auth.europe-west1.gcp.commercetools.com',
  apiURL: 'https://api.europe-west1.gcp.commercetools.com',
  clientID: '17Vsg4Fd0B6R5uyQSpyFBtSg',
  secret: 'VO58PKAJnBSMr-KR6dWv99ifl1gBlkdV',
  scopes: [
    'manage_project:scooters-online-shop manage_api_clients:scooters-online-shop view_api_clients:scooters-online-shop'
  ]
}

const ageForValigation = 13

const timeoutForShortMessages = 2000
const timeoutForErrorMessages = 2000
const timeoutForRedirect = 2000

export default projectConfig
export { ageForValigation, timeoutForShortMessages, timeoutForErrorMessages, timeoutForRedirect }
