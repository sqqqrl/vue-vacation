import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'
import Authenticate from './views/Authenticate.vue'
import Vacation from './views/Vacation.vue'
import Users from './views/Users.vue'
import store from './store'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/authenticate',
      name: 'authenticate',
      component: Authenticate
    },
    {
      path: '/vacation',
      name: 'vacation',
      component: Vacation
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  // redirect to login page if user is not logged in and trying to access a restricted page
  const publicPages = ['/authenticate', '/']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    return next('/authenticate')
  }

  if (loggedIn) {
    const userRoles = await store.dispatch('role', { id: JSON.parse(loggedIn).id });

    switch(to.name) {

      case 'authenticate': 
        return next('/')

      case 'users':
        if (!userRoles.includes("ROLE_ADMIN")) {
          return next('/')
        }

      default: 
        return next()
 
    }
  }

  next()
})

export default router
