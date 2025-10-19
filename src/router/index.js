import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import New from '../views/New.vue'
import Send from '../views/Send.vue'
import Share from '../views/Share.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: () => import('../views/Login.vue') },
  { path: '/home', name: 'Home', component: () => import('../views/Home.vue') },
  { path: '/new', name: 'New', component: () => import('../views/New.vue') },
  { path: '/send', name: 'Send', component: () => import('../views/Send.vue') },
  { path: '/share', name: 'Share', component: () => import('../views/Share.vue') },
]

const router = createRouter({
  history: createWebHistory(), // ✅ 移除 '/white5/'
  routes,
})

export default router
