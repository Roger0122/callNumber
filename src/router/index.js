import { createWebHistory , createRouter } from 'vue-router'
import CustomerView from '../views/CustomerView.vue'
import AdminView from '../views/AdminView.vue'
import OrderStatusView from '../views/OrderStatusView.vue'

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
  { path: '/order/:orderId',
    component: OrderStatusView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
