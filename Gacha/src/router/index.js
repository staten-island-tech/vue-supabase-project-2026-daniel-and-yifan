import Enemies from '@/views/enemies.vue'
import Gacha from '@/views/gacha.vue'
import Home from '@/views/home.vue'
import Login from '@/views/login.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useUserData } from '@/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {requiresAuth : true}
    },
    {
      path: '/Gacha',
      name: 'gacha',
      component: Gacha,
      meta: {requiresAuth : true}
    },
    {
      path: '/Login',
      name: 'login',
      component: Login,
      meta: {requiresAuth : false}
    },
    {
      path: '/Enemies',
      name: 'enemies',
      component: Enemies,
      meta: {requiresAuth : true}
    }
  ],
})

router.beforeEach(async (to, from) => {
  const userData = useUserData()
  console.log(userData.uid)
  if (to.meta.requiresAuth && !userData.uid) {
    return {
      name: "login"
    }
  }
  
})

export default router
