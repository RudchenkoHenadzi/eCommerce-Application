import { useCartsStore } from '@/stores/Carts'

export function getCartID() {
  const cartsStore = useCartsStore()
  return cartsStore.currentCart ? cartsStore.currentCart.id : ''
}

export function isCartExist(cartId: string) {
  console.log('isCartExist')
  return cartId !== ''
}
