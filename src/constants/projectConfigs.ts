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

const AGE_RESTRICTION = 13

const TIMEOUT_SHORT_MESSAGE = 2000
const TIMEOUT_ERROR_MESSAGE = 2000
const TIMEOUT_REDIRECT = 2100

const ERROR_MESSAGE_TEXTS = {
  userExists:
    'Пользователь с таким email уже зарегистрирован. Войдите в учетную запись или используйте другой email для регистрации.',
  errorInvalidInput: 'Введены некорректные данные. Исправьте данные и попробуйте снова.',
  successRegistration: 'Пользователь успешно создан',
  successLogin: 'Вы успешно вошли в учетную запись.',
  invalidPassword: 'Неверный пароль. Пожалуйста, исправьте введенный пароль и попробуйте еще раз.',
  commonError: 'Что-то пошло не так. Повторите попытку позже.'
}

export default PROJECT_CONFIG
export {
  AGE_RESTRICTION,
  TIMEOUT_SHORT_MESSAGE,
  TIMEOUT_ERROR_MESSAGE,
  TIMEOUT_REDIRECT,
  ERROR_MESSAGE_TEXTS
}
