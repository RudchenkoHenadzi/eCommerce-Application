const ERROR_TEXTS = {
  MALFORMED_PARAMETER: 'Malformed parameter', //: 'Неверный параметр запроса',
  DUPLICATED_DATA: 'There is already an existing customer with the provided email.'
}

const MESSAGE_TEXTS = {
  COMMON: {
    commonError: 'Что-то пошло не так. Повторите попытку позже.',
    errorInvalidInput: 'Введены некорректные данные. Исправьте данные и попробуйте снова.'
  },
  AUTH: {
    userExists:
      'Пользователь с таким email уже зарегистрирован. Войдите в учетную запись или используйте другой email для регистрации.',
    successRegistration: 'Пользователь успешно создан',
    successLogin: 'Вы успешно вошли в учетную запись.',
    invalidPassword:
      'Неверный пароль. Пожалуйста, исправьте введенный пароль и попробуйте еще раз.',
    userNotExist:
      'Такого пользователя не существует. Пожалуйста, исправьте введенные данные и попробуйте снова либо зарегистрируйтесь.'
  },
  PROFILE: {
    CHANGE_USER_DATA: {
      successUpdateData: 'Данные успешно обновлены',
      duplicatedData: 'Данный email не может быть использован. Попробуйте ввести другие данные.'
    },
    CHANGE_PASSWORD: {
      successChange: 'Пароль успешно изменен.',
      wrongPassword: 'Введен неверный пароль.'
    }
  }
}

export { MESSAGE_TEXTS, ERROR_TEXTS }
