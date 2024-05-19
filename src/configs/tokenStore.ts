import type { TokenCache, TokenStore } from '@commercetools/sdk-client-v2'

class MyTokenStore implements TokenCache {
  cache: TokenStore = {
    token: '',
    refreshToken: '',
    expirationTime: 0
  }

  get() {
    return this.cache
  }

  set(newTokenCache: TokenStore) {
    Object.assign(this.cache, newTokenCache)
  }
}

export default MyTokenStore
