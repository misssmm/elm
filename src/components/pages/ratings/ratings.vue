<template>
  <div class="ratings" ref="rating">
    <div>
      <div class="ratings-score">
        <div class="score-left">
          <div class="box1">{{this.seller.score}}</div>
          <div class="box2">综合评分</div>
          <div class="box3">高于周边商家{{this.seller.rankRate}}%</div>
        </div>
        <div class="score-right">
          <div class="wrapper">
            <div class="score-content">
              <span>服务态度</span>
              <star :size="24" :score="seller.foodScore"></star>
              <span>{{this.seller.foodScore}}</span>
            </div>
            <div class="score-content">
              <span>服务态度</span>
              <star :size="24" :score="seller.score"></star>
              <span>{{this.seller.score}}</span>
            </div>
            <div class="score-content">
              <span>送达时间</span>
              <span class="dTime">{{this.seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect
        :select-type="selectType"
        :ratings="ratings"
        :only-content="onlyContent"
        @toggle="toggleContent"
        @select="selectRating"
      ></ratingselect>
      <div class="rating-wrapper">
        <ul v-show="ratings && ratings.length">
          <li
            v-for="(rating,index) in ratings"
            v-show="needShow(rating.rateType, rating.text)"
            :key="index"
            class="rating-item border-1px"
          >
            <div class="user">
              <span class="name">{{rating.username}}</span>
              <img class="avatar" width="12" height="12" :src="rating.avatar">
            </div>
            <div class="time">{{rating.rateTime}}</div>
            <p class="text">
              <span
                :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"
              ></span>
              {{rating.text}}
            </p>
          </li>
        </ul>
        <div class="no-rating" v-show="!ratings || !ratings.length">暂无评价</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BScroll from "better-scroll";
import star from "@/components/common/star/star";
import split from "@/components/common/split/split";
import ratingselect from "@/components/pages/tarbar/tarbar";
const ALL = 2;
export default {
  mounted() {
    if (!this.scroll) {
      this.scroll = new BScroll(this.$refs.rating, {
        click: true
      });
    } else {
      this.scroll.refresh();
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      ratings: [],
      onlyContent: false,
      selectType: ALL
    };
  },
  components: {
    star,
    split,
    ratingselect
  },
  created() {
    this.getSeller();
  },
  methods: {
    getSeller() {
      axios
        .get("https://easy-mock.com/mock/5c1712f8c1299917934b0070/api/rating")
        .then(this._getSeller);
    },
    _getSeller(res) {
      res = res.data;
      if (res) {
        this.ratings = res.ratings;
      }
      console.log(this.ratings);
    },
    toggleContent() {
      this.onlyContent = !this.onlyContent;
    },
    selectRating(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        // 如果只显示内容，但无内容时，返回false
        return false;
      } else if (this.selectType === ALL) {
        // 如果是显示全部内容，每条直接返回true
        return true;
      } else {
        return type === this.selectType; // 符合选择type类型的条数才显示
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../../common/stylus/mixin.styl';

.ratings {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;

  .ratings-score {
    display: flex;

    .score-left {
      flex: 276;
      height: 106px;
      padding: 18px 0;
      box-sizing: border-box;
      text-align: center;
      border-right: 1px solid rgba(7, 17, 27, 0.1);

      .box1 {
        font-size: 24px;
        line-height: 28px;
        color: rgb(255, 153, 0);
        margin-bottom: 6px;
      }

      .box2 {
        font-size: 12px;
        line-height: 12px;
        color: rgb(7, 17, 27);
        font-weight: 700;
        margin-bottom: 8px;
      }

      .box3 {
        font-size: 10px;
        line-height: 10px;
        color: rgba(7, 17, 27, 0.5);
      }
    }

    .score-right {
      flex: 474;
      height: 106px;
      padding: 18px 0;
      box-sizing: border-box;
      border-right: 1px solid rgba(7, 17, 27, 0.1);

      .wrapper {
        margin: 0 24px;

        .score-content {
          font-size: 12px;
          line-height: 18px;
          color: rgb(7, 17, 27);
          margin-bottom: 8px;

          .star {
            display: inline-block;
            margin: 0 12px;
            vertical-align: top;
          }

          .dTime {
            font-size: 12px;
            line-height: 18px;
            color: rgb(147, 153, 159);
            margin: 0 12px;
          }
        }
      }
    }
  }

  .rating-wrapper {
    padding: 0 18px;

    .rating-item {
      display: flex;
      padding: 18px 0;
      border-1px(rgba(7, 17, 27, 0.1));

      .avatar {
        flex: 0 0 28px;
        width: 28px;
        margin-right: 12px;

        img {
          border-radius: 50%;
        }
      }

      .content {
        position: relative;
        flex: 1;

        .name {
          margin-bottom: 4px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(7, 17, 27);
        }

        .star-wrapper {
          margin-bottom: 6px;
          font-size: 0;

          .star {
            display: inline-block;
            margin-right: 6px;
            vertical-align: top;
          }

          .delivery {
            display: inline-block;
            vertical-align: top;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .text {
          margin-bottom: 8px;
          line-height: 18px;
          color: rgb(7, 17, 27);
          font-size: 12px;
        }

        .recommend {
          line-height: 16px;
          font-size: 0;

          .icon-thumb_up, .item {
            display: inline-block;
            margin: 0 8px 4px 0;
            font-size: 9px;
          }

          .icon-thumb_up {
            color: rgb(0, 160, 220);
          }

          .item {
            padding: 0 6px;
            border: 1px solid rgba(7, 17, 27, 0.1);
            border-radius: 1px;
            color: rgb(147, 153, 159);
            background: #fff;
          }
        }

        .time {
          position: absolute;
          top: 0;
          right: 0;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
}
</style>