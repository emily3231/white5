import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import New from '../views/New.vue' // 🆕 新增這行

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/home', name: 'Home', component: Home },
  { path: '/new', name: 'New', component: New }, // 🆕 新頁面
]

const router = createRouter({
  history: createWebHistory('/white4/'), // 保持原本的 base
  routes,
})

export default router
