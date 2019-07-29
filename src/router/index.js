import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import gps from '@/pages/gps'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/gps',
      name: 'gps',
      component: gps
    }
  ]
})
