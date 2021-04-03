import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Ttt from '../views/Ttt.vue'
import CpMain from '../views/cp/Main.vue'
import Login from '../views/cp/Login.vue'
import HomePage from '../components/cp/pages/HomePage.vue'
import ProductsPage from '../components/cp/pages/ProductsPage.vue'
import CustomersPage from '../components/cp/pages/CustomersPage.vue'
import CatsPage from '../components/cp/pages/CatsPage.vue'

import FrontMain from '../views/front/Main.vue'
import FrontLogin from '../views/front/Login.vue'
import FrontSignUp from '../views/front/Signup.vue'



// middlewares
import authCP from "../middlewares/authCP"

const routes = [

  {
    path: "/",
    name: 'FrontMain',
    component: FrontMain,
    children: []
  },
  {
    path: '/front/login',
    name: 'FrontLogin',
    component: FrontLogin,
  },
  {
    path: '/front/signup',
    name: 'FrontSignUp',
    component: FrontSignUp,
  },
  {
    path: '/cp/',
    name: 'CpMain',
    component: CpMain,
    children: [
      {
        path: '',
        name: 'HomePage',
        component: HomePage

      },
      {
        path: 'products',
        name: 'ProductsPage',
        component: ProductsPage

      },
      {
        path: 'customers',
        name: 'CustomersPage',
        component: CustomersPage

      },
      {
        path: 'cats',
        name: 'CatsPage',
        component: CatsPage

      }
    ],

  },
  {
    path: '/cp/login',
    name: 'Login',
    component: Login,
  }

]

const router = createRouter({
  base: '/',
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(),
  routes
})

export default router
