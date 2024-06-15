import { setAnonymousId } from '@/helpers/localStorageServices/anonymousIdActions';

export function createAnonymousID() {
  const id = crypto.randomUUID();
  setAnonymousId(id);
  return id;
}
