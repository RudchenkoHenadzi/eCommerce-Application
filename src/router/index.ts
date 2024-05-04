import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import CartShoppingView from '../views/CartShoppingView.vue'

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
      component: () => import('../views/CatalogView.vue')
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserProfileView.vue')
    },
    {
      path: '/authorization',
      name: 'authorization',
      component: () => import('../views/AuthorizationView.vue')
    }
  ]
})

export default router
