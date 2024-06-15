import { useApiRootStore } from '@/stores/ApiRootStore';

export function updateUserData(
  version: number,
  fisrtName: string,
  lastName: string,
  birthDate: string,
  email: string
) {
  const apiRoot = useApiRootStore().apiRoot;
  return apiRoot
    .me()
    .post({
      body: {
        version: version,
        actions: [
          {
            action: 'setFirstName',
            firstName: fisrtName
          },
          {
            action: 'setLastName',
            lastName: lastName
          },
          {
            action: 'setDateOfBirth',
            dateOfBirth: birthDate
          },
          {
            action: 'changeEmail',
            email: email
          }
        ]
      }
    })
    .execute();
}
