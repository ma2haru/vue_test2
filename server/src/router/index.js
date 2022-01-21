import Vue from 'vue'
import Router from 'vue-router'
import ShopList from '@/components/ShopList'
import ShopDetail from '@/components/ShopDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShopList',
      component: ShopList
    },
    {
      path: '/shop/:shopId',
      name: 'ShopDetail',
      component: ShopDetail
    }
  ]
})
