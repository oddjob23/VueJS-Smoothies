import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddSmothie from '@/components/AddSmothie';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-smothie',
      name: 'AddSmothie',
      component: AddSmothie
    }
  ]
})
