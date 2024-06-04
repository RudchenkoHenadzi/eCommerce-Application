const ERROR_TEXTS = {
  'Malformed parameter': 'Неверный параметр запроса'
}

const MESSAGE_TEXTS = {
  userExists:
    'Пользователь с таким email уже зарегистрирован. Войдите в учетную запись или используйте другой email для регистрации.',
  errorInvalidInput: 'Введены некорректные данные. Исправьте данные и попробуйте снова.',
  successRegistration: 'Пользователь успешно создан',
  successLogin: 'Вы успешно вошли в учетную запись.',
  invalidPassword: 'Неверный пароль. Пожалуйста, исправьте введенный пароль и попробуйте еще раз.',
  userNotExist:
    'Такого пользователя не существует. Пожалуйста, исправьте введенные данные и попробуйте снова либо зарегистрируйтесь.',
  commonError: 'Что-то пошло не так. Повторите попытку позже.',
  AUTH: {},
  PROFILE: {
    successUpdateData: 'Данные успешно обновлены'
  }
}

export { MESSAGE_TEXTS, ERROR_TEXTS }
