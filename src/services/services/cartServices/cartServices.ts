import deleteProductFromCart from '@/services/apiMethods/cart/deleteProductFromCart';
import { getProductQuantity } from '@/helpers/extractData/getProductQuantity';
import { useAppStatusStore } from '@/stores/AppStatusStore';
import { useCartsStore } from '@/stores/Carts';
import { isCartExist } from '@/helpers/dataCheck/isCartExist';
import createNewCart from '@/services/apiMethods/cart/createNewCart';
import addProductToCart from '@/services/apiMethods/cart/addProductToCart';
import { extractLineItemIdFromCart } from '@/helpers/extractData/extractProductDataFromCart';

export async function deleteItemFromCart(
  quantity: number,
  localLineItemId: string,
  cartVersion: number,
  productId: string,
  changeLocalQuantityCallback: (newInCartNumber: number) => void
) {
  const cartsStore = useCartsStore();
  const cartId = cartsStore.userCurrentCart ? cartsStore.userCurrentCart.id : '';

  if (cartId) {
    const appStatus = useAppStatusStore();
    try {
      appStatus.startLoading();
      const deletingProductResult = await deleteProductFromCart(
        cartId,
        localLineItemId,
        cartVersion,
        quantity
      );

      if (deletingProductResult.statusCode === 200) {
        cartsStore.setCurrentCart(deletingProductResult.body);
        changeLocalQuantityCallback(
          getProductQuantity(deletingProductResult.body.lineItems, productId)
        );
      }
    } catch (error) {
      throw new Error('не удалось удалить товар из корзины1');
    } finally {
      appStatus.stopLoading();
    }
  } else {
    throw new Error('не удалось удалить товар из корзины2');
  }
}

export async function addItemToCart(
  productId: string,
  setLocalQuantityCallback: (quantity: number) => void,
  setLineItemIdCallback?: (lineItemId: string) => void
) {
  const cartsStore = useCartsStore();
  const appStatus = useAppStatusStore();

  if (!isCartExist(cartsStore.cartId)) {
    try {
      appStatus.startLoading();
      const cartCreationResult = await createNewCart();

      if (cartCreationResult.statusCode === 200 || cartCreationResult.statusCode === 201) {
        cartsStore.setCurrentCart(cartCreationResult.body);
        const addingItemResult = await addProductToCart(
          cartCreationResult.body.id,
          productId,
          cartCreationResult.body.version
        );

        if (addingItemResult.statusCode === 200) {
          if (setLineItemIdCallback) {
            setLineItemIdCallback(extractLineItemIdFromCart(productId, addingItemResult.body));
          }

          setLocalQuantityCallback(getProductQuantity(addingItemResult.body.lineItems, productId));
          cartsStore.setCurrentCart(addingItemResult.body);
        } else {
          throw new Error('Товар не удалось добавить в корзину.44');
        }
      } else {
        throw new Error('Товар не удалось добавить в корзину. Не была создана корзина.44');
      }
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    } finally {
      appStatus.stopLoading();
    }
  } else {
    try {
      appStatus.startLoading();
      const cartId = cartsStore.currentCart?.id;
      const cartVersion = cartsStore.currentCart?.version;

      if (cartId && cartVersion) {
        const addingItemResult = await addProductToCart(cartId, productId, cartVersion);

        if (addingItemResult.statusCode === 200) {
          setLocalQuantityCallback(getProductQuantity(addingItemResult.body.lineItems, productId));

          if (setLineItemIdCallback) {
            setLineItemIdCallback(extractLineItemIdFromCart(productId, addingItemResult.body));
          }
          cartsStore.setCurrentCart(addingItemResult.body);
        } else {
          throw new Error('Товар не удалось добавить в корзину.45');
        }
      } else {
        throw new Error('Что-то пошло не так.45');
      }
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    } finally {
      appStatus.stopLoading();
    }
  }
}
