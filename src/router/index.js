import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ToegewezenView from '@/views/ToegewezenView.vue'
import UitgevoerdView from '@/views/UitgevoerdView.vue'
import DocumentatieView from '@/views/DocumentatieView.vue'
import InstellingenView from '@/views/InstellingenView.vue'
import SignUpView from '@/views/SignUpView.vue'
import LoginView from '@/views/LoginView.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
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
  {
    path: '/aanmelden',
    name: 'aanmelden',
    component: SignUpView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  // catchall 404
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
