import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import Goods from '@/components/pages/goods/goods'
// import Seller from '@/components/pages/seller/Seller'
// import Ratings from '@/components/pages/ratings/Ratings'

const Goods=()=>import('@/components/pages/goods/goods')
const Seller=()=>import('@/components/pages/seller/Seller')
const Ratings=()=>import('@/components/pages/ratings/Ratings')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/goods'
    },{
      path: '/goods',
      name:'Goods',
      component:Goods
    },{
      path:'/seller',
      name:'Seller',
      component:Seller
    },{
      path:'/ratings',
      name:'Ratings',
      component:Ratings
    }

  ]
})
