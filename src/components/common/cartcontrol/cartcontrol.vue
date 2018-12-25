<template>
    <div class="cartcontrol">
        <div class="cart-decrease icon-remove_circle_outline" @click.stop.prevent="decrease" v-show="food.count>0"></div>
        <div class="cart-count" v-if="food.count>0">{{food.count}}</div>
        <div class="cart-increase icon-add_circle" @click.stop.prevent="addcount"></div>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default {
        props:{
            food:{
                type:Object
            }
        },
        created(){
            //console.log(this.food)
        },
        methods:{
            addcount(event){
                if (!this.food.count) {
                    Vue.set(this.food,'count',1)
                }else{
                    this.food.count++ 
                }
                this.$emit('cartadd',event.target)
            },
            decrease(){
                this.food.count--
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .cartcontrol
        font-size 0
        .cart-decrease
            display inline-block
            padding 6px 
            font-size 24px
            line-height 24px
            color rgb(0,160,220) 
        .cart-count
            display inline-block
            font-size 10px
            line-height 24px
            vertical-align top
            width 12px
            padding-top 6px
            text-align center
            color rgb(147,153,159)
        .cart-increase
            display inline-block
            padding 6px 
            line-height 24px
            font-size 24px
            color rgb(0,160,220)
</style>