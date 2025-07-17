import { createWebHistory , createRouter } from 'vue-router'
import CustomerView from '../views/CustomerView.vue'
import AdminView from '../views/AdminView.vue'

const routes = [
  { 
    path: '/',
    name: 'Customer', 
    component: CustomerView 
  },
  { 
    path: '/admin', 
    name: 'Admin', 
    component: AdminView 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
