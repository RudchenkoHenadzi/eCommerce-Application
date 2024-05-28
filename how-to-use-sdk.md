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
      .withAnonymousSessionFlow({ // тут мы выбираем разные middleware в зависимости от типа нашего юзера (аноним или зарегестрированный)
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
```

### Авторизация в приложении

#### Регистрация:

+ собрать данные необходимые для регистрации
+ отправить данные с помощью apiRoot анонимного флоу
+ если успешно - создать новый apiRoot с password flow, используя данные нового зарегистрированного пользователя

#### Логин

+ получить логин и пароль пользователя
+ создать новый apiRoot с этими данными 
+ отправить данные в commerce tools с помощью нового apiRoot
+ если успешно - ок
+ если нет - создать новый флоу анонимного пользователя


### Варианты 

1. первый вход в приложение - анонимный пользователь
  + создаем анонимный флоу
  + сохраняем id корзины анонимного пользователя
  + используем этот apiRoot для всех запросов к api
2. пользователь, который ранее уже зарегистрировался и вошел в учетную запись, вернулся в приложение. В этом случае нам нужно создать клиента с refresh token flow и далее из него создать api builder
