import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Ttt from '../views/Ttt.vue'
import HomePage from '../views/controlPanel/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/cp/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/ttt',
    name: 'Ttt',
    component: Ttt
  },
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(),
  routes
})

export default router
