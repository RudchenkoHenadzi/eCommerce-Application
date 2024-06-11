import type { TokenCache, TokenStore } from '@commercetools/sdk-client-v2'
import { useUserStore } from '@/stores/User'

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
    this.saveTokenToStore(
      newTokenCache.token,
      newTokenCache.expirationTime,
      newTokenCache.refreshToken
    )
  }

  saveTokenToStore(token: string, expirationTime: number, refreshToken?: string) {
    const user = useUserStore()
    user.setUserToken(token)
    user.setExpirationTime(expirationTime)
    if (refreshToken) user.setUserRefreshToken(refreshToken)
  }
}

export default MyTokenStore
