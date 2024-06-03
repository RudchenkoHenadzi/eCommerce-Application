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

const TIMEOUT_SHORT_MESSAGE = 2000
const TIMEOUT_ERROR_MESSAGE = 2000
const TIMEOUT_REDIRECT = 2100

const MESSAGE_TEXTS = {
  userExists:
    'Пользователь с таким email уже зарегистрирован. Войдите в учетную запись или используйте другой email для регистрации.',
  errorInvalidInput: 'Введены некорректные данные. Исправьте данные и попробуйте снова.',
  successRegistration: 'Пользователь успешно создан',
  successLogin: 'Вы успешно вошли в учетную запись.',
  invalidPassword: 'Неверный пароль. Пожалуйста, исправьте введенный пароль и попробуйте еще раз.',
  userNotExist:
    'Такого пользователя не существует. Пожалуйста, исправьте введенные данные и попробуйте снова либо зарегистрируйтесь.',
  commonError: 'Что-то пошло не так. Повторите попытку позже.'
}

const PRODUCTS_LIMIT_PER_LOAD = 20

export default PROJECT_CONFIG
export {
  AGE_RESTRICTION,
  DEFAULT_LANG,
  DEFAULT_CURRENCY,
  TIMEOUT_SHORT_MESSAGE,
  TIMEOUT_ERROR_MESSAGE,
  TIMEOUT_REDIRECT,
  MESSAGE_TEXTS,
  PRODUCTS_LIMIT_PER_LOAD
}
