import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: guardRoute,
  },
  {
    path: '/login',
    name: 'Login',
    component: function () {
      return import('../views/Login.vue')
    }
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: function () {
      return import('../views/Favorites.vue')
    },
    beforeEnter: guardRoute,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function guardRoute (to, from, next) {
  const auth = router.app.$options.store.getters.IS_AUTHENTICATED

  if (!auth) {
    next({name: 'Login'})
    return
  }
  next()
}

export default router
