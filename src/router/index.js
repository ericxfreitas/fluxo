import Vue from 'vue'
import Router from 'vue-router'
import Tasks from '@/views/Tasks'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/tasks',
      name: 'Tasks',
      component: Tasks
    }
  ]
})
