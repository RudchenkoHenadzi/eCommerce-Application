## SDK

### общее 

Client - сущность, через которую мы обращаемся к API Commerce Tools
User/flow - пользователь нашего приложения

### Начало работы

Для того чтобы иметь доступ к API через SDK, необходимо создать клиента и далее, с его
помощью, создать api builder (в примерах в документации и в коде у нас - apiRoot).

**Для создания клиента нам нужны:**
+ создать API client (merchant center -> settings -> developer settings) и сохранить данные для входа (projectKey, authURL, apiURL, clientID, secret, scopes) в коде
+ создать клиента с помощью `new ClientBuilder` и различных middlewares (подробное их описание тут: [https://docs.commercetools.com/sdk/js-sdk-middleware](https://docs.commercetools.com/sdk/js-sdk-middleware)):
    ```js
      const anonymousClient = new ClientBuilder()
      .withProjectKey(projectKey) //обязательный middleware
      .withAnonymousSessionFlow({ // тут мы выбираем разные middleware в зависимости от типа нашего юзера: аноним или зарегестрированный (*)
        host: authURL,
        projectKey: projectKey,
        credentials: {
          clientId: clientID,
          clientSecret: secret
        },
        scopes: scopes,
        tokenCache: new MyTokenStore(),
        fetch
      })
      .withHttpMiddleware({ // обязательный middleware
        host: apiURL,
        fetch
      })
      .build()
  ```
+ создаем api builder, с помощью которого в дальнейшем будем взаимодействовать с API Commerce tools:
    ```js
    const apiRoot = createApiBuilderFromCtpClient(anonymousClient).withProjectKey({
      projectKey: projectKey
    })
    ```
(*) Больше про различные варианты flow тут: [https://docs.commercetools.com/api/authorization](https://docs.commercetools.com/api/authorization)
  
### Примеры работы с SDK:
```js
// получение информации о проекте:
apiRoot
  .customers()
  .get({ //сюда можно передавать различные параметры, касающиеся 
    queryArgs: {
      limit: 50
    }
  })
  .execute()
  .then((res) => console.log(res))
  .catch((error) => {
    console.log(error)
  })

// найти продукт по его key
    apiRoot
        .products()
        .withKey({
          key: 'wine-bottle-opener'
        })
        .get()
        .execute()
        .then(response => {
          console.log(response.body);
        })
        .catch(e => console.log(e))

// получить категорию по key
    apiRoot
        .categories()
        .withKey({
          key: 'home-decor'
        })
        .get()
        .execute()
        .then(response => {
          console.log(response.body);
        })
        .catch(e => console.log(e))

// отсортировать продукты по какому-либо параметру
//name.{language} categoryOrderHints.{category ID} createdAt lastModifiedAt id score
apiRoot
        .products()
        .get({
          queryArgs: {
            sort: 'createdAt asc'
          }
        })
        .execute()
        .then(response => {
          console.log(response.body);
        })
        .catch(e => console.log(e))

// получить список продуктов, отсортированных по цене
    apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            sort: 'price asc',
            limit: 150
          }
        })
        .execute()
        .then(response => {
          console.log(response.body);
        })
        .catch(e => console.log(e))

// получить товары на скидке

apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            filter: 'variants.prices.discounted:exists',
          },
        })
        .execute()
        .then(response => {
          console.log(response.body);
        })
        .catch(e => console.log(e))

// создание корзины (получится ли с анонимом?
apiRoot.me().carts().post({
  body: {
    currency: 'EUR', // Используйте нужную вам валюту
  }
}).execute().then(response => {
  // Получение ID корзины
  const cartId = response.body.id;
  console.log(`Cart ID: ${cartId}`);
}).catch(error => {
  console.error(error);
});

```
Примеры в документации: [https://docs.commercetools.com/sdk/sdk-example-code](https://docs.commercetools.com/sdk/sdk-example-code)

### Авторизация в приложении

#### Регистрация:

+ собрать данные необходимые для регистрации (минимум - email, что еще можно собрать - можно посмотреть [здесь](https://docs.commercetools.com/api/projects/customers#customerdraft))
+ отправить данные с помощью apiRoot анонимного флоу
  ```js
    apiRoot.customers().post({ body: customerDraft }).execute()
  ```
+ если успешно - создать новый apiRoot с password flow, используя данные нового зарегистрированного пользователя
+ про регистрацию в документации - [тут](https://docs.commercetools.com/api/projects/customers#create-sign-up-customer)

#### Логин

+ получить логин и пароль пользователя
+ создать нового клиента с passwordFlow и далее из него - новый apiRoot
+ отправить данные в commerce tools с помощью нового apiRoot
  ```js
    apiRoot.me().login().post({ body: { email, password } }).execute()
  ```
+ если успешно - ок
+ если нет - создать нового клиента с anonymousFlow и далее из него - новый apiRoot
+ про логин в документации - [здесь](https://docs.commercetools.com/api/projects/customers#authenticate-sign-in-customer)


### Варианты 

1. первый вход в приложение - анонимный пользователь (мы не знаем, есть ли он у нас в базе коммерс тулз, но он уже имеет доступ к товарам, может собирать корзину и тп)
  + создаем анонимный флоу
  + сохраняем id корзины анонимного пользователя
  + используем этот apiRoot для всех запросов к api
2. пользователь, который ранее уже зарегистрировался и вошел в учетную запись, вернулся в приложение. В этом случае нам нужно создать клиента с refresh token flow и далее из него создать api builder
