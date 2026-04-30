import Gacha from '@/views/gacha.vue'
import Home from '@/views/home.vue'
import Login from '@/views/login.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/Gacha',
      name: 'gacha',
      component: Gacha,
    },
    {
      path: '/Login',
      name: 'login',
      component: Login,
    }
  ],
})

export default router
