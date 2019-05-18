import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddSmothie from '@/components/AddSmothie';
import EditSmoothie from '@/components/EditSmoothie';

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
    },
    {
      path: '/edit-smoothie/:smoothie_slug',
      name: 'EditSmoothie',
      component: EditSmoothie
    }
  ]
})
