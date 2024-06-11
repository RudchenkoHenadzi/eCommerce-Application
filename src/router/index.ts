import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import CartShoppingView from '../views/CartShoppingView.vue'
import { useUserStore } from '@/stores/User'
import NotFoundView from '@/views/NotFoundView.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import UserProfileView from '@/views/UserProfileView.vue'
import LoginView from '@/views/LoginView.vue'
import ProductView from '@/views/ProductView.vue'
import CatalogView from '@/views/CatalogView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/cart-shopping',
      name: 'cart-shopping',
      component: CartShoppingView
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: CatalogView
    },
    {
      path: '/product',
      name: 'product',
      component: ProductView
    },
    {
      path: '/user',
      name: 'user',
      component: UserProfileView
    },
    {
      path: '/authorization',
      name: 'authorization',
      component: LoginView
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationView
    },
    {
      path: '/:notFound',
      name: 'NotFound',
      component: NotFoundView
    }
  ]
})

router.beforeEach((to) => {
  const appUser = useUserStore()
  if (
    (appUser.isLoggedIn && to.name == 'authorization') ||
    (appUser.isLoggedIn && to.name == 'registration')
  ) {
    return '/'
  }

  if (!appUser.isLoggedIn && to.name == 'user') {
    return '/'
  }
})

export default router
