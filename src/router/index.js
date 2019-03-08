import Vue from 'vue'
import Router from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import LoginPage from '@/components/LoginPage'
import About from '@/components/About'
import DashBoard from '@/components/DashBoard'
import GraphChartView from '@/components/GraphChartView'
import McqCreatorView from '@/components/McqCreatorView'
import GraphDisplay from '@/components/GraphChart/GraphDisplay'
import CalculateEquations from '@/components/GraphChart/CalculateEquations'
import Profile from '@/components/Profile'
import ExampleMCQ from '@/components/ExampleMCQ'
import BootstrapVue from 'bootstrap-vue'
import VueKatex from 'vue-katex'
import 'katex/dist/katex.min.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.use(BootstrapVue)
Vue.use(VueKatex)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*', redirect: '/dashboard'
    },
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
      name: 'GraphChartView',
      component: GraphChartView,
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
    },
    {
      path: '/MCQ',
      name: 'ExampleMCQ',
      component: ExampleMCQ
    },
    {
      path: '/mcqCreator',
      name: 'McqCreatorView',
      component: McqCreatorView
    }
  ]
})
