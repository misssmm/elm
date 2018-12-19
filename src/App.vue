<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <router-link tag="a" to="/goods" class="tab-item">商品</router-link>
      <router-link tag="a" to="/ratings" class="tab-item">评论</router-link>
      <router-link tag="a" to="/seller" class="tab-item">商家</router-link>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import vHeader from '@/components/pages/header/header'
export default {
  name: 'App',
  data(){
    return{
      seller:{}
    }
  },
  created(){
    this.getSellerInfo()
  },
  methods:{
    getSellerInfo(){
      axios.get('https://easy-mock.com/mock/5c1712f8c1299917934b0070/api/seller')
           .then(this.getSellerInfoSuc)
    },
    getSellerInfoSuc(res){
      res=res.data
      if(res){
        this.seller=res.seller
      }
      // console.log(this.seller)
    }
  },
  components:{
    vHeader
  }
}
</script>

<style scoped lang="stylus">
@import "./common/stylus/mixin.styl"
.tab
  display flex
  height 40px
  width 100%
  line-height 40px
  border-1px(rgba(7,17,27,0.1))
  .tab-item
    flex 1
    text-align center
    font-size 14px
    color rgb(77,85,93)
    &.router-link-active
      color rgb(240,20,20)

</style>
