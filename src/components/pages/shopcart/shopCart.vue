<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <div class="logger-wrapper">
                    <div class="logger" :class="{'highlight':totalCount>0}">
                        <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
                    </div>
                    <div class="num" v-if="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{'highlight':totalCount>0}">￥{{totalPrice}}</div>
                <div class="desc">另需配送费￥{{seller.deliveryPrice}}元</div>
            </div>
            <div class="content-right" :class="{'enough':this.totalPrice>=this.seller.minPrice}">
                <span>{{payDesc}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            seller:{
                type:Object
            },
            selectFoods:{
                type:Array,
                default(){
                    return [
                        {
                            count:1,
                            price:10
                        }
                    ]
                }
            }
        },
        computed:{
            totalPrice(){
                let total=0
                this.selectFoods.forEach((food)=>{
                    total+=food.price*food.count
                })
                return total
            },
            totalCount(){
                let count=0
                this.selectFoods.forEach((food)=>{
                    count+=food.count
                })
                return count
            },
            payDesc(){
                if (this.totalPrice===0) {
                    return `￥${this.seller.minPrice}起送`
                }else if(this.totalPrice<this.seller.minPrice){
                    let diff=this.seller.minPrice-this.totalPrice
                    return `还差￥${diff}起送`
                }else{
                    return '去结算'
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .shopcart
        position fixed
        height 48px
        width 100%
        left 0
        bottom 0
        z-index 50
        background #cccccc
        .content
            display flex
            background #141d27
            font-size 0
            .content-left
                flex 1
                .logger-wrapper
                    display inline-block
                    position relative
                    top -10px
                    margin 0 12px
                    padding 6px
                    width 56px 
                    height 56px
                    box-sizing border-box
                    vertical-align top
                    border-radius 50%
                    background #141d27
                    .logger
                        width 100%
                        height 100%
                        border-radius 50%
                        background #2b343c
                        text-align center
                        &.highlight
                            background rgb(0,160,220)
                        .icon-shopping_cart
                            font-size 24px
                            color #80858a
                            line-height 44px
                            &.highlight
                                color white
                    .num
                        position absolute
                        top 0
                        right 0
                        width 24px
                        height 16px
                        line-height 16px
                        text-align center
                        border-radius 16px
                        font-size 9px
                        font-weight 700
                        color white
                        background red
                        box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
                .price
                    display inline-block
                    vertical-align top
                    line-height 24px
                    margin-top 12px
                    box-sizing border-box
                    padding-right 12px
                    border-right 1px solid rgba(255,255,255,0.1)
                    color rgba(255,255,255,0.4)
                    font-size 16px
                    font-weight 700
                    &.highlight
                        color white
                .desc
                    display inline-block
                    vertical-align top
                    line-height 24px
                    margin 12px 0 0 12px
                    font-size 10px
                    color rgba(255,255,255,0.4)
            .content-right
                height 48px
                flex 0 0 89px
                width 89px
                background rgba(0,0,0,0.2)
                font-size 12px
                color rgba(255,255,255,0.4)
                line-height 24px
                font-weight 700
                text-align center
                display table
                padding 0 8px
                &.enough
                    color white
                    background #18B029
                span 
                    display table-cell
                    vertical-align middle
                   
</style>