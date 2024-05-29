import type {
  IAddressDraft,
  IAddressesConfiguration,
  IBillingAddressModel,
  ICustomerDraft,
  IShippingAddressModel
} from '@/types/customer-types'

export function createCustomerDraft(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  addressesConfiguration: IAddressesConfiguration
): ICustomerDraft {
  const customerDraft: ICustomerDraft = {
    dateOfBirth: dateOfBirth,
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: password,
    addresses: addressesConfiguration.addresses,
    shippingAddresses: [0],
    billingAddresses: [0]
  }

  if (addressesConfiguration) {
    const { defaultShippingAddress, defaultBillingAddress, shippingAddresses, billingAddresses } =
      addressesConfiguration

    if (defaultShippingAddress || defaultShippingAddress === 0) {
      customerDraft.defaultShippingAddress = defaultShippingAddress
    }
    if (shippingAddresses) {
      customerDraft.shippingAddresses = shippingAddresses
    }
    if (defaultBillingAddress || defaultBillingAddress === 0) {
      customerDraft.defaultBillingAddress = defaultBillingAddress
    }
    if (billingAddresses) {
      customerDraft.billingAddresses = billingAddresses
    }
  }
  return customerDraft
}

export function createAddressDraft(
  firstName: string,
  lastName: string,
  email: string,
  addressModel: IShippingAddressModel | IBillingAddressModel
): IAddressDraft {
  if ('shippingStreetName' in addressModel) {
    return {
      firstName: firstName,
      lastName: lastName,
      streetName: addressModel.shippingStreetName,
      building: addressModel.shippingBuilding,
      apartment: addressModel.shippingApartment,
      postalCode: addressModel.shippingPostalCode,
      city: addressModel.shippingCity,
      country: 'RU',
      email: email
    }
  } else {
    return {
      firstName: firstName,
      lastName: lastName,
      streetName: addressModel.billingStreetName,
      building: addressModel.billingBuilding,
      apartment: addressModel.billingApartment,
      postalCode: addressModel.billingPostalCode,
      city: addressModel.billingCity,
      country: 'RU',
      email: email
    }
  }
}

export function createAddressesConfiguration(
  firstName: string,
  lastName: string,
  email: string,
  isShippingAddressDefault: boolean,
  isBillingAddressDefault: boolean,
  shippindAddress: IShippingAddressModel,
  billingAddress?: IBillingAddressModel
): IAddressesConfiguration {
  const addressesConfiguration: IAddressesConfiguration = {
    addresses: [],
    shippingAddresses: [0]
  }
  const shippingAddressDraft = createAddressDraft(firstName, lastName, email, shippindAddress)
  addressesConfiguration.addresses.push(shippingAddressDraft)
  if (billingAddress) {
    const billingAddressDraft = createAddressDraft(firstName, lastName, email, billingAddress)
    addressesConfiguration.addresses.push(billingAddressDraft)
  }
  const { billingAddressIndex, defaultBillingAddressIndex } = checkBillingAddressIndexes(
    isBillingAddressDefault,
    Boolean(billingAddress)
  )
  setAddressesIndexes(
    isShippingAddressDefault,
    billingAddressIndex,
    defaultBillingAddressIndex,
    addressesConfiguration
  )
  console.log('addressesConfigurationaddressesConfiguration')
  console.log(addressesConfiguration)
  return addressesConfiguration
}

function setAddressesIndexes(
  isShippingAddressDefault: boolean,
  billingBaseIndex: number,
  billingDefaultIndex: number,
  addressesConfiguration: IAddressesConfiguration
) {
  if (isShippingAddressDefault) {
    addressesConfiguration.defaultShippingAddress = 0
  }
  if (billingBaseIndex >= 0) {
    addressesConfiguration.billingAddresses = [billingBaseIndex]
  }
  if (billingDefaultIndex >= 0) {
    addressesConfiguration.defaultBillingAddress = billingDefaultIndex
  }
  return addressesConfiguration
}

function checkBillingAddressIndexes(
  isBillingAddressDefault: boolean,
  areBothAddressesSame: boolean
) {
  const res = {
    billingAddressIndex: -1,
    defaultBillingAddressIndex: -1
  }

  if (areBothAddressesSame) {
    res.billingAddressIndex = 0
    if (isBillingAddressDefault) {
      res.defaultBillingAddressIndex = 0
    }
  } else {
    res.billingAddressIndex = 1
    if (isBillingAddressDefault) {
      res.defaultBillingAddressIndex = 1
    }
  }
  return res
}
