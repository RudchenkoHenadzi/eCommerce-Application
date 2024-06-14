import { useCartsStore } from '@/stores/Carts'

export function getCartID() {
  const cartsStore = useCartsStore()
  console.log(cartsStore.currentCart)
  if (cartsStore.currentCart) console.log(cartsStore.currentCart.id)
  return cartsStore.currentCart ? cartsStore.currentCart.id : ''
}

export function isCartExist(cartId: string) {
  console.log('isCartExist')
  return cartId !== ''
}
