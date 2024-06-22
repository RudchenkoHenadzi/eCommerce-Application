import { useApiRootStore } from '@/stores/ApiRootStore';

export function addNewAddress(
  version: number,
  postalCode: string,
  city: string,
  streetName: string,
  building: string,
  apartment: string
) {
  const apiRoot = useApiRootStore().apiRoot;
  return apiRoot
    .me()
    .post({
      body: {
        version: version,
        actions: [
          {
            action: 'addAddress',
            address: {
              streetName: streetName,
              postalCode: postalCode,
              city: city,
              country: 'RU',
              building: building,
              apartment: apartment
            }
          }
        ]
      }
    })
    .execute();
}
