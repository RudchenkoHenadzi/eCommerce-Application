import { useApiRootStore } from '@/stores/ApiRootStore';
import { isLoginRequestSuccess, isUserNotFound } from '@/helpers/dataCheck/loginCheck';

export default async function userLogin(email: string, password: string) {
  const apiRootStore = useApiRootStore();
  const apiRoot = apiRootStore.apiRoot;
  apiRootStore.createAuthApiRoot(email, password);
  try {
    const result = await apiRoot
      .me()
      .login()
      .post({
        body: { email, password }
      })
      .execute();

    if (!isLoginRequestSuccess) {
      apiRootStore.createAnonymousApiRoot();
    }
    return result;
  } catch (e: unknown) {
    apiRootStore.createAnonymousApiRoot();
    if (isUserNotFound(e)) {
      throw new Error('userNotExist');
    } else {
      throw new Error('commonError');
    }
  }
}
