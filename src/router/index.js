import Vue from 'vue'
import Router from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import About from '@/components/About'
import DashBoard from '@/components/DashBoard'
import GraphChartView from '@/components/GraphChartView'
import McqCreatorView from '@/components/McqCreatorView'
import LoginView from '@/components/LoginView'
import ProfileView from '@/components/ProfileView'
import MCQView from '@/components/MCQView'
import CreateGroupView from '@/components/CreateGroupView'
import GroupView from '@/components/GroupView'
import Admin from '@/components/Admin'
import GraphDisplay from '@/components/GraphChart/GraphDisplay'
import CalculateEquations from '@/components/GraphChart/CalculateEquations'
import McqQuestions from '@/components/McqCreator/McqQuestions'
import ProfileGraph from '@/components/Profile/ProfileGraph'
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
      name: 'LoginView',
      component: LoginView
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
        }
      ]
    },
    {
      path: '/dashboard/ProfileView',
      name: 'ProfileView',
      component: ProfileView,
      children: [
        {
          path: '/profile/ProfileGraph',
          name: 'ProfileGraph',
          component: ProfileGraph
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
      name: 'MCQView',
      component: MCQView
    },
    {
      path: '/mcqCreator',
      name: 'McqCreatorView',
      component: McqCreatorView,
      children: [
        {
          path: '/McqQuestions',
          name: 'McqQuestions',
          component: McqQuestions
        }
      ]
    },
    {
      path: '/createGroupView',
      name: 'CreateGroupView',
      component: CreateGroupView
    },
    {
      path: '/groupView',
      name: 'GroupView',
      component: GroupView
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: Admin
    }
  ]
})
