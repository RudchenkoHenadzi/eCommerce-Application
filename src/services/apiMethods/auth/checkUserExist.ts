import { useApiRootStore } from '@/stores/ApiRootStore'

export default async function checkUserExist(email: string) {
  const apiRoot = useApiRootStore().apiRoot
  return apiRoot
    .customers()
    .get({
      queryArgs: {
        where: `email="${email}"`
      }
    })
    .execute()
    .then((res) => res.body.results.length > 0)
    .catch((error: unknown) => {
      if (error instanceof Error) throw new Error(error.message)
    })
}
