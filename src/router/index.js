import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Ttt from '../views/Ttt.vue'
import HomePage from '../views/controlPanel/HomePage.vue'
import Login from '../views/controlPanel/Login.vue'

// middlewares
import authCP from "../middlewares/authCP"

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
    component: HomePage,
    beforeEnter: (to, from, next) => {

      authCP().then(res=>{
        if(!res.result){ 
          next({name:'Login'});
        }else{
          next();
        }
      });

    }
  },
  {
    path: '/cp/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {

      authCP().then(res=>{
        if(res.result){ 
          next({name:'HomePage'});
        }else{
          next();
        }
      });

    }
  },
  {
    path: '/ttt',
    name: 'Ttt',
    component: Ttt,
    beforeEnter: (to, from, next) => {
      next();
    }
  },
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(),
  routes
})

export default router
