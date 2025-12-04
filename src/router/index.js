import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HourlyView from '../views/HourlyView.vue'
import FiveDayView from '../views/FiveDayView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/hourly',
    name: 'Hourly',
    component: HourlyView
  },
  {
    path: '/forecast',
    name: 'FiveDay',
    component: FiveDayView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
