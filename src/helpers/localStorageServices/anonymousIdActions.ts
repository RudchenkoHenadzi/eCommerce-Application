export function getAnonymousId() {
  return localStorage.getItem('ecommerce-anonymousId')
}

export function setAnonymousId(id: string) {
  localStorage.setItem('ecommerce-anonymousId', id)
}
