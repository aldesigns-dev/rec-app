import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ToegewezenView from '@/views/ToegewezenView.vue'
import UitgevoerdView from '@/views/UitgevoerdView.vue'
import DocumentatieView from '@/views/DocumentatieView.vue'
import InstellingenView from '@/views/InstellingenView.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'dasboard',
    component: HomeView
  },
  {
    path: '/toegewezen-rapportages',
    name: 'toegewezen rapportages',
    component: ToegewezenView
  },
  {
    path: '/uitgevoerde-rapportages',
    name: 'uitgevoerde rapportages',
    component: UitgevoerdView
  },
  {
    path: '/documentatie',
    name: 'documentatie',
    component: DocumentatieView
  },
  {
    path: '/instellingen',
    name: 'instellingen',
    component: InstellingenView
  },
  // catchall 404
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
