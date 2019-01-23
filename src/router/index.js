import Vue from 'vue'
import Router from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import LoginPage from '@/components/LoginPage'
import About from '@/components/About'
import DashBoard from '@/components/DashBoard'
import GraphPage from '@/components/GraphPage'
import GraphDisplay from '@/components/GraphDisplay'
import CalculateEquations from '@/components/CalculateEquations'
import Profile from '@/components/Profile'
import BootstrapVue from 'bootstrap-vue'
import VueKatex from 'vue-katex'
import 'katex/dist/katex.min.css'

Vue.use(BootstrapVue)
Vue.use(VueKatex)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/dashboard',
      name: 'DashBoard',
      component: DashBoard,
      children: [
        {
          path: '/dashboard/about',
          name: 'About',
          component: About
        },
        {
          path: '/dashboard/profile',
          name: 'Profile',
          component: Profile
        }
      ]
    },
    {
      path: '/graphPage',
      name: 'GraphPage',
      component: GraphPage,
      children: [
        {
          path: '/graphPage/graphDisplay',
          name: 'GraphDisplay',
          component: GraphDisplay
        },
        {
          path: '/graphPage/calculateEquations',
          name: 'CalculateEquations',
          component: CalculateEquations
        }]
    }
  ]
})
