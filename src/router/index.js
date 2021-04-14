import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Ttt from '../views/Ttt.vue'
import CpMain from '../views/cp/Main.vue'
import Login from '../views/cp/Login.vue'

import HomePage from '../components/cp/pages/HomePage.vue'
import ProductsPage from '../components/cp/pages/ProductsPage.vue'
import CustomersPage from '../components/cp/pages/CustomersPage.vue'
import CatsPage from '../components/cp/pages/CatsPage.vue'
import OrdersPage from '../components/cp/pages/OrdersPage.vue'


import FrontMain from '../views/front/Main.vue'
import FrontLogin from '../views/front/Login.vue'
import FrontSignUp from '../views/front/Signup.vue'

import FrontHomePage from '../components/front/pages/HomePage.vue'
import AboutPage from '../components/front/pages/AboutPage.vue'
import ContactPage from '../components/front/pages/ContactPage.vue'


import DashboardMain from '../views/front/DashboardMain.vue'
import DashboardHomePage from '../components/front/pages/DashboardHomePage.vue'
import OrderPage from '../components/front/pages/OrderPage.vue'
import ProfileDetailPage from '../components/front/pages/ProfileDetailPage.vue'

import ShopPage from '../components/front/pages/ShopPage.vue'
import ProductDetailPage from '../components/front/pages/ProductDetailPage.vue'
import CartPage from '../components/front/pages/CartPage.vue'
import CheckoutPage from '../components/front/pages/CheckoutPage.vue'
import ConfirmationPage from '../components/front/pages/ConfirmationPage.vue'



const routes = [
  {
    path: "/",
    name: 'Home',
    component: Home,
  },
  {
    path: "/cp/ttt",
    name: 'Ttt',
    component: Ttt,
    children: []
  },

  {
    path: "/front/",
    name: 'FrontMain',
    component: FrontMain,
    children: [
      {
        path: '',
        name: 'FrontHomePage',
        component: FrontHomePage

      },
      {
        path: 'about',
        name: 'AboutPage',
        component: AboutPage

      },
      {
        path: 'contact',
        name: 'ContactPage',
        component: ContactPage

      },

      {
        path: 'dashboard',
        name: 'DashboardMain',
        component: DashboardMain,
        children: [
          {
            path: '',
            name: 'DashboardHomePage',
            component: DashboardHomePage

          },
          {
            path: 'order',
            name: 'OrderPage',
            component: OrderPage

          },
          {
            path: 'profileDetail',
            name: 'ProfileDetailPage',
            component: ProfileDetailPage

          }
        ]

      },

      {
        path: 'shop',
        name: 'ShopPage',
        component: ShopPage

      },
      {
        path: 'product/:id',
        name: 'ProductDetailPage',
        component: ProductDetailPage

      },
      {
        path: 'cart',
        name: 'CartPage',
        component: CartPage

      },
      {
        path: 'checkout',
        name: 'CheckoutPage',
        component: CheckoutPage

      },

    ]
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
    path: '/front/confirmation',
    name: 'ConfirmationPage',
    component: ConfirmationPage

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
        path: 'orders',
        name: 'OrdersPage',
        component: OrdersPage

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
