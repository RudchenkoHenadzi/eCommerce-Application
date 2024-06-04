const ERROR_TEXTS = {
  MALFORMED_PARAMENTER: 'Malformed parameter', //: 'Неверный параметр запроса',
  DUPLICATED_DATA: 'There is already an existing customer with the provided email.'
}

const MESSAGE_TEXTS = {
  commonError: 'Что-то пошло не так. Повторите попытку позже.',
  AUTH: {
    userExists:
      'Пользователь с таким email уже зарегистрирован. Войдите в учетную запись или используйте другой email для регистрации.',
    errorInvalidInput: 'Введены некорректные данные. Исправьте данные и попробуйте снова.',
    successRegistration: 'Пользователь успешно создан',
    successLogin: 'Вы успешно вошли в учетную запись.',
    invalidPassword:
      'Неверный пароль. Пожалуйста, исправьте введенный пароль и попробуйте еще раз.',
    userNotExist:
      'Такого пользователя не существует. Пожалуйста, исправьте введенные данные и попробуйте снова либо зарегистрируйтесь.'
  },
  PROFILE: {
    successUpdateData: 'Данные успешно обновлены',
    duplicatedData: 'Данный email не может быть использован. Попробуйте ввести другие данные.'
  }
}

export { MESSAGE_TEXTS, ERROR_TEXTS }
