<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menu">
            <div>
                <div v-for="(item,index) in goods" :key="index" class="menu-item" @click="selectMenu(index)" :class="{'current':currentIndex===index}">
                    <span>{{item.name}}</span>
                </div>
            </div>
        </div>
        <div class="foods-wrapper" ref="foods"> 
            <ul>
                <li v-for="(item,index) in goods" :key="index" class="food-list" ref="foodlist">
                    <h1 class="title">{{item.name}} </h1>
                    <ul class="content-wrapper">
                        <li class="food-item" v-for="(it,index0) in item.foods" :key="index0">
                           <div class="icon">
                               <img :src="it.icon" width="57" height="57" alt="">
                           </div>
                           <div class="content">
                                <h2 class="name">{{it.name}}</h2>
                                <p class="desc">{{it.description}}</p>
                                <div class="extra">
                                    <span>月售{{it.sellCount}}</span>
                                    <span>好评率{{it.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span>￥{{it.price}}</span>
                                    <span class="oldPrice" v-show="it.oldPrice">￥{{it.oldPrice}}</span>
                                </div>
                           </div> 
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shop-cart :seller="seller"></shop-cart>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import axios from 'axios'
    import shopCart from '@/components/pages/shopcart/shopcart'
    export default {    
       data(){
           return{
               goods:[],
               listHeight:[],
               scrollY:0
           }
       }  ,
       props:{
           seller:{
               type:Object
           }
       },
       created(){
           this.getGoodsInfo()
       },
       components:{
           shopCart
       },
       methods:{
           _initScroll(){
               this.menuScroll=new BScroll(this.$refs.menu,{
                   click:true,
                   probeType:3
               })
               this.foodsScroll=new BScroll(this.$refs.foods,{
                   probeType:3,
                   click:true
               })
               this.foodsScroll.on('scroll',(pos)=>{  //监听scroll事件 回调中获取手指位置
                    // console.log('p')
                  this.scrollY=Math.abs(Math.round(pos.y))
                   
               })
                // console.log(this.foodsScroll)
           },
           _caculateHight(){
               let foodList=this.$refs.foodlist
               let height=0
               this.listHeight.push(height)
               for(let i=0;i<foodList.length;i++){
                   let item=foodList[i]
                   height+=item.clientHeight
                   this.listHeight.push(height)
               }
            //    console.log(this.listHeight)
           },
           getGoodsInfo(){
               axios.get('https://easy-mock.com/mock/5c19a9ef4e25a97c9bde411f/api/goods')
               .then(this.getGoodsInfoSuc)
           },
           getGoodsInfoSuc(res){
               res=res.data
               if(res){
                   this.goods=res.goods
               }
               //console.log(this.goods)
               this.$nextTick(()=>{
                   this._initScroll()
                   this._caculateHight()
               })
           },
           selectMenu(index){
               let foodList=this.$refs.foodlist
               let el=foodList[index]
               this.foodsScroll.scrollToElement(el,300)
            
           }
       },
       computed:{
           currentIndex(){
               for(let i=0;i<this.listHeight.length;i++){
                    let height1=this.listHeight[i]
                    let height2=this.listHeight[i+1] 
                    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) { 
                        //当前位置位于每个栏目中间   不能超出最后一个li
                        // console.log(this.scrollY)
                        // console.log(i)
                        return i
                    }
               }
               return 0
           }
       }
    }
</script>

<style lang="stylus" scoped>
@import "../../../common/stylus/mixin.styl"
.goods
    display flex
    overflow hidden
    position: absolute
    top: 174px
    bottom: 46px
    width 100%
    .menu-wrapper
        flex 0 0 80px
        width 80px
        background-color #f3f5f7
        .menu-item
            display table
            width 56px
            padding 0 12px
            height 54px
            text-align center
            font-size 12px
            line-height 14px
            color rgb(0,0,20)
            border-bottom 1px solid rgba(7,17,27,0.1)
            &.current
                color red
            span 
                display table-cell
                vertical-align middle
    .foods-wrapper
        flex 1
        padding 0 18px
        .food-list
            .title
                font-size 12px
                color rgb(147,153,159)
                line-height 26px
                height 26px
            .content-wrapper
                margin-top 18px
                margin-bottom 18px
                font-size 0
                .food-item
                    border-1px(rgba(7, 17, 27, 0.3))
                    margin-bottom 18px
                    padding-bottom 18px
                    .icon
                        display inline-block
                        vertical-align top
                    .content
                        display inline-block
                        font-size 12px
                        margin-left 10px
                        width 170px
                        .name
                            font-size 14px
                            line-height 14px
                            color rgb(7,17,27)
                            margin 2px auto 8px
                        .desc
                            margin-bottom 8px
                            line-height 10px
                            font-size 10px
                            color rgb(147,153,159)
                            overflow hidden
                            text-overflow ellipsis
                            white-space nowrap
                        .extra
                            font-size 10px
                            color rgb(147,153,159)
                            span 
                                margin-right 12px
                        .price
                            font-size 14px
                            font-weight 700
                            color  red
                            .oldPrice
                                font-size 10px
                                line-height 14px
                                color rgb(147,153,159)
</style>