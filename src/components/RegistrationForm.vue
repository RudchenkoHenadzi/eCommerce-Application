<template>
  <form class="registration-form" @submit.prevent="submitRegistrationForm()">
    <div class="registration-form__title">Регистрация</div>
    <div class="registration-form__wrapper">
      <div class="registration-form__row">
        <div class="registration-form__item">
          <div class="registration-form__label">Имя:</div>
          <input
            type="text"
            id="registration-name"
            v-model.trim="registrationForm.name"
            name="name"
            placeholder="Введите имя"
            class="registration-form__input input"
            :class="{
              invalid:
                (v$.registrationForm.name.$dirty && !v$.registrationForm.name.required.$response) ||
                (v$.registrationForm.name.$dirty &&
                  v$.registrationForm.name.regexSpecialSymbol.$response)
            }"
          />
          <div
            v-for="error of v$.registrationForm.name.$errors"
            :key="error.$uid"
            class="invalid-message"
          >
            {{ error.$message }}
          </div>
        </div>
        <div class="registration-form__item">
          <div class="registration-form__label">Фамилия:</div>
          <input
            type="text"
            id="registration-lastname"
            v-model.trim="registrationForm.lastname"
            name="lastname"
            placeholder="Введите фамилию"
            class="registration-form__input input"
            :class="{
              invalid:
                (v$.registrationForm.lastname.$dirty &&
                  !v$.registrationForm.lastname.required.$response) ||
                (v$.registrationForm.name.$dirty &&
                  v$.registrationForm.name.regexSpecialSymbol.$response)
            }"
          />
          <div
            v-for="error of v$.registrationForm.lastname.$errors"
            :key="error.$uid"
            class="invalid-message"
          >
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="registration-form__item">
        <div class="registration-form__label">Дата рождения:</div>
        <input
          type="date"
          id="registration-date"
          v-model="registrationForm.date"
          name="date"
          class="registration-form__input input"
          :class="{
            invalid:
              (v$.registrationForm.date.$dirty && !v$.registrationForm.date.required.$response) ||
              (v$.registrationForm.date.$dirty && !v$.registrationForm.date.minValue)
          }"
        />
        <div
          v-for="error of v$.registrationForm.date.$errors"
          :key="error.$uid"
          class="invalid-message"
        >
          {{ error.$message }}
        </div>
      </div>
      <div class="registration-form__row">
        <div class="registration-form__item">
          <div class="registration-form__label">Email:</div>
          <input
            type="email"
            id="login-email"
            v-model.trim="registrationForm.email"
            name="email"
            placeholder="Введите email"
            :class="{
              invalid:
                (v$.registrationForm.email.$dirty &&
                  !v$.registrationForm.email.required.$response) ||
                (v$.registrationForm.email.$dirty && !v$.registrationForm.email.email.$response)
            }"
            class="registration-form__input input"
          />

          <div
            v-for="error of v$.registrationForm.email.$errors"
            :key="error.$uid"
            class="invalid-message"
          >
            {{ error.$message }}
          </div>
        </div>
        <div class="registration-form__item">
          <div class="registration-form__label">Пароль:</div>
          <input
            type="password"
            id="registration-password"
            v-model.trim="registrationForm.password"
            name="password"
            placeholder="Введите пароль"
            class="registration-form__input input"
            :class="{
              invalid:
                (v$.registrationForm.password.$dirty &&
                  !v$.registrationForm.password.required.$response) ||
                (v$.registrationForm.password.$dirty &&
                  !v$.registrationForm.password.minLength.$response) ||
                (v$.registrationForm.password.$dirty &&
                  v$.registrationForm.password.regexPassword.$response)
            }"
          />
          <div
            v-for="error of v$.registrationForm.password.$errors"
            :key="error.$uid"
            class="invalid-message"
          >
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="registration-form__row">
        <div class="registration-form__item">
          <div class="registration-form__label">Город:</div>
          <input
            type="text"
            id="registration-city"
            v-model.trim="registrationForm.city"
            name="city"
            placeholder="Ваш город"
            class="registration-form__input input"
            :class="{
              invalid:
                (v$.registrationForm.city.$dirty && !v$.registrationForm.city.required.$response) ||
                (v$.registrationForm.city.$dirty &&
                  !v$.registrationForm.city.regexSpecialSymbol.$response)
            }"
          />
          <div
            v-for="error of v$.registrationForm.city.$errors"
            :key="error.$uid"
            class="invalid-message"
          >
            {{ error.$message }}
          </div>
        </div>
        <div class="registration-form__item">
          <div class="registration-form__label">Улица:</div>
          <input
            type="text"
            id="registration-street"
            v-model.trim="registrationForm.street"
            name="street"
            placeholder="Ваша улица"
            class="registration-form__input input"
            :class="{
              invalid:
                v$.registrationForm.street.$dirty && !v$.registrationForm.street.required.$response
            }"
          />
          <div
            v-for="error of v$.registrationForm.street.$errors"
            :key="error.$uid"
            class="invalid-message"
          >
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="registration-form__row">
        <div class="registration-form__item">
          <div class="registration-form__label">Почтовый индекс:</div>
          <input
            type="number"
            id="registration-postcode"
            v-model.trim="registrationForm.postcode"
            name="postcode"
            placeholder="Почтовый индекс"
            class="registration-form__input input"
            :class="{
              invalid:
                v$.registrationForm.postcode.$dirty &&
                !v$.registrationForm.postcode.required.$response
            }"
          />
          <div
            v-for="error of v$.registrationForm.postcode.$errors"
            :key="error.$uid"
            class="invalid-message"
          >
            {{ error.$message }}
          </div>
        </div>
        <div class="registration-form__item">
          <div class="registration-form__label">Страна:</div>
          <input
            type="text"
            id="registration-country"
            v-model.trim="registrationForm.country"
            name="country"
            placeholder="Страна"
            class="registration-form__input input"
            :class="{
              invalid:
                v$.registrationForm.country.$dirty &&
                !v$.registrationForm.country.required.$response
            }"
            disabled
          />
          <div
            v-for="error of v$.registrationForm.country.$errors"
            :key="error.$uid"
            class="invalid-message"
          >
            {{ error.$message }}
          </div>
        </div>
      </div>
    </div>
    <button type="submit" class="registration-form__btn button-white">Регистрация</button>
    <RouterLink class="registration-form__switch" to="/authorization">Войти</RouterLink>
  </form>
</template>

<script lang="ts">
import axios from 'axios'
import useValidate from '@vuelidate/core'
import { required, email, helpers, minLength, maxLength, minValue } from '@vuelidate/validators'

const regexPassword = helpers.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
const regexSpecialSymbol = helpers.regex(/^[a-zA-Zа-яА-ЯёЁ]+$/)

export default {
  name: 'RegistrationForm',

  setup() {
    return {
      v$: useValidate()
    }
  },

  data() {
    return {
      registrationForm: {
        email: '',
        password: '',
        name: '',
        lastname: '',
        date: '',
        street: '',
        city: '',
        postcode: '',
        country: 'Россия'
      }
    }
  },

  methods: {
    async submitRegistrationForm() {
      const result = await this.v$.registrationForm.$validate()
      if (result) {
        axios
          .post('https://jsonplaceholder.typicode.com/posts')
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
          })
        console.log('В форме ошибок нет, можем отправлять')
      } else {
        console.log('В форме есть ошибки')
      }
    }
  },

  validations: {
    registrationForm: {
      name: {
        required: helpers.withMessage('Введите имя', required),
        regexSpecialSymbol: helpers.withMessage('Недопустимые символы', regexSpecialSymbol)
      },
      lastname: {
        required: helpers.withMessage('Введите фамилию', required),
        regexSpecialSymbol: helpers.withMessage('Недопустимые символы', regexSpecialSymbol)
      },
      date: {
        required: helpers.withMessage('Укажите вашу дату рождения', required),
        minValue: helpers.withMessage('Неверная дата', minValue('2000-01-01'))
      },
      email: {
        required: helpers.withMessage('Введите email', required),
        email: helpers.withMessage('Не корректный email', email)
      },
      password: {
        required: helpers.withMessage('Введите пароль', required),
        minLength: helpers.withMessage(
          `Пароль должен быть больше ${minLength(8).$params.min} символов`,
          minLength(8)
        ),
        regexPassword: helpers.withMessage('Слабый пароль', regexPassword)
      },
      street: {
        required: helpers.withMessage('Укажите улицу', required),
        minLength: helpers.withMessage(
          `Улица должнабыть ${minLength(8).$params.min} символов`,
          minLength(8)
        )
      },
      city: {
        required: helpers.withMessage('Укажите город', required),
        regexSpecialSymbol: helpers.withMessage('Недопустимые символы', regexSpecialSymbol)
      },
      postcode: {
        required: helpers.withMessage('Укажите почтовый индекс', required),
        minLength: helpers.withMessage(`Укажите ${minLength(6).$params.min} цифр`, minLength(6)),
        maxLength: helpers.withMessage(`Укажите ${maxLength(6).$params.max} цифр`, maxLength(6))
      },
      country: {
        required: helpers.withMessage('Укажите страну', required)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';
@import '@/assets/styles/extends.scss';

.registration-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 20px;
  width: 100%;
  max-width: 480px;
  padding: 30px 20px;
  background-color: $color-purple;
  color: $color-white;
  border-radius: 10px;

  @media (width <=380px) {
    border-radius: 0;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    gap: 15px;
    margin: 0;
    padding: 0;
    border: none;
  }

  &__title {
    font-size: 20px;
    text-align: center;
    text-transform: uppercase;
  }

  &__row {
    display: flex;
    gap: 10px;
    @media (width <= 480px) {
      flex-direction: column;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
  }

  &__switch {
    height: auto;
    text-align: center;
    text-decoration: none;
    color: $color-white;
  }
}
</style>
