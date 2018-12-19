<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="content-left">
                <img :src="seller.avatar" alt="" width="64" height="64">
            </div>
            <div class="content-center">
                <div>
                    <span class="bran"> 
                    </span>
                    <span class="title">{{seller.name}}</span> 
                </div>
                <div class="dec">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
                <div v-if="seller.supports" class="sup">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span>{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="content-right" @click="showPopup">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bottom-wrapper">
            <div class="b-title"></div>
            <div class="b-text">{{seller.bulletin}}</div>
            <div class="b-icon" @click="showPopup">
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" alt="">
        </div>
        <transition name="fade">
            <div v-if="hashow" class="popup">
                <div class="popup-wrapper clearfix">
                    <div class="popup-main">
                        <div class="main-title">{{seller.name}}</div>
                        <div class="main-stars">
                            <star :size="48" :score="seller.score"></star>
                        </div>
                        <div class="main-info">
                            <div class="box1"></div>
                            <div class="box2">优惠信息</div>
                            <div class="box1"></div>
                        </div>
                        <ul v-if="seller.supports" class="supports">
                            <li v-for="(item,index) in seller.supports" :key="index" class="supports-item">
                                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                                <span class="text">{{seller.supports[index].description}}</span>
                            </li>
                        </ul>
                        <div class="main-info notice">
                            <div class="box1"></div>
                            <div class="box2">商家公告</div>
                            <div class="box1"></div>
                        </div>
                        <div class="main-notice">
                            <div>{{seller.bulletin}}</div>
                        </div>
                    </div>
                </div>
                <div class="popup-x" @click="hidePopup">
                    <i class="icon-close"></i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import star from '@/components/common/star/star'
    export default {
        props:{
            seller:{
                type:Object,
                default:{}
            }
        },
        data(){
            return{
                hashow:false
            }
        },
        created(){
            this.classMap=['decrease','discount','guarantee','invoice','special']
        },
        methods:{
            showPopup(){
                this.hashow=true
            },
            hidePopup(){
                this.hashow=false
            }
        },
        components:{
            star
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus"  scoped> 
@import "../../../common/stylus/mixin";
.header
    background rgba(7,17,27,0.5)
    position relative
    overflow hidden
    color white
    .content-wrapper
        font-size 0
        padding 24px 12px 18px 24px
        position relative
        .content-left
            display inline-block
        .content-center
            display inline-block
            font-size 20px
            vertical-align top
            margin-left 16px
            .title
                font-size 16px
                font-weight bold
                line-height 18px
            .bran
                display inline-block
                width 30px
                height 18px
                bg-image('brand')
                background-size 30px 18px
            .dec
                font-size 12px
                font-weight 200
                line-height 12px
                margin-top 8px
            .sup
                font-size 10px
                margin-top 10px
                .icon
                    display inline-block
                    width 12px
                    height 12px
                    margin-right 4px
                    background-size 12px 12px
                    background-repeat no-repeat
                    &.decrease
                        bg-image('decrease_1')
                    &.discount
                        bg-image('discount_1')
                    &.guarantee
                        bg-image('guarantee_1')
                    &.invoice
                        bg-image('invoice_1')
                    &.special
                        bg-image('special_1')
        .content-right
            position absolute 
            width 35px
            height 24px
            right 12px
            bottom 18px
            padding 0 8px
            line-height 24px
            border-radius 14px
            background rgba(0,0,0,0.2)
            text-align center
            .count
                font-size 10px
            .icon-keyboard_arrow_right
                font-size 10px
    .bottom-wrapper
        height 28px
        display flex
        justify-content space-between
        padding 0 12px 0 12px
        line-height 28px
        text-align center
        background rgba(7,17,27,0.2)
        .b-title
            width 22px
            height 28px
            bg-image(bulletin)
            font-size 20px
            background-size 20px 12px
            min-width 25px
            background-repeat no-repeat
            background-position center
        .b-text
            font-size 10px
            line-height 28px
            font-weight 200
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
    .background
        position absolute
        top 0
        left 0
        width 100%
        height 100%rgba(7,17,27,0.8)

        z-index -1
        filter blur(10px)
    .fade-enter-active,.fade-leave-active
        transition opacity 1s
    .fade-enter, .fade-leave-to
        opacity 0
    .popup
        top 0
        left 0
        position fixed 
        z-index 99
        width 100%
        background rgba(7,17,27,0.8)
        height 100%
        
        .popup-wrapper
            width 100%
            min-height 100%
            text-align center
            .popup-main
                margin-top 64px
                padding-bottom 64px
                .main-title
                    font-size 16px
                    font-weight 700
                    color rgb(255,255,255)
                    line-height 16px
                .main-stars
                    margin-top 16px
                    height 24px
                    ling-height 24px
                .main-info
                    display flex
                    width 80%
                    margin 28px auto 24px
                    .box1
                        flex 1
                        border-bottom 1px solid rgba(255,255,255,0.2)
                        position relative
                        top -6px
                    .box2
                        padding 0 12px
                        font-size 14px
                        font-weight 700
                .supports
                    width 80%
                    margin 0 auto
                    text-align left 
                    .supports-item
                        padding 0 12px
                        margin-bottom 12px
                        font-size 0
                        &:last-child
                            margin-bottom 0
                        .icon
                            display inline-block
                            width 16px 
                            height 16px
                            vertical-align top
                            margin-right 6px
                            background-size 16px 16px
                            background-repeat no-repeat
                            &.decrease
                                bg-image('decrease_2')
                            &.discount
                                bg-image('discount_2')
                            &.guarantee
                                bg-image('guarantee_2')
                            &.invoice
                                bg-image('invoice_2')
                            &.special
                                bg-image('special_2')
                        .text
                            font-size 12px
                            line-height 12px 
                            font-weight 200
                .main-notice
                    width 80%
                    font-size 12px
                    line-height 24px
                    margin 0 auto
                    text-align left 
                    div
                        padding 0 12px

        .popup-x
            position relative
            width 32px
            height 32px
            margin -64px auto 0 auto 
            clear both
            font-size 32px
</style>