<template>
  <div class="fp-con">
    <div class="header-wrapper">
      <div class="rest-opportunity">您还有3此机会</div>
      <div class="activity-time">活动时间：2021.08.10-09.10</div>
    </div>
    <div class="ab pais-con">
      <div
        class="ab card-li"
        v-for="(item, index) in cardList"
        :key="item.index"
        :id="index"
        v-bind:style="{ top: item.top + 'px', left: item.left + 'px', transition: 'all ' + turnCardTime + 's' }"
      >
        <div class="fc_wrapper" @click="turnLuckyCard(index)">
          <div
            class="fc_inner"
            v-bind:class="{ fztogether: item.isTurned }"
            v-bind:style="{ transition: 'transform ' + turnCardTime + 's' }"
          >
            <div class="fc_front"><img :src="item.frontImage" /></div>
            <div class="fc_back"><img :src="item.backgroundImage" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const prize_img = require('../../assets/images/p_card06.png')
const prize_item_bg = require('../../assets/images/prize_item_bg.png')
export default {
  name: 'LuckyTurn',
  components: {},
  data() {
    return {
      cardBackgroundImage: prize_item_bg, // 卡片背面
      turnCardTime: 0.5, // 翻牌时间 单位s
      turnCardSpeed: 0.1, // 洗牌速度 单位s
      nolotindex: 5, // 没有中奖的卡片在cardArr数组中的位置
      canClick: true, // 卡片是否可以点击
      cardList: [
        {
          frontImage: prize_item_bg, // 奖品图片
          backgroundImage: prize_item_bg, // 背景图片
          top: 0, // 位置
          left: 0, // 位置
          isTurned: false, // false:奖品面展示 true:卡背面
          cardItemName: '手机' // 奖品名字
        },
        {
          frontImage: prize_item_bg,
          backgroundImage: prize_item_bg, // 背景图片
          top: 0,
          left: 193,
          isTurned: false,
          cardItemName: '耳机'
        },
        {
          frontImage: prize_item_bg,
          backgroundImage: prize_item_bg, // 背景图片
          top: 0,
          left: 386,
          isTurned: false,
          cardItemName: '优惠券'
        },
        {
          frontImage: prize_item_bg,
          backgroundImage: prize_item_bg, // 背景图片
          top: 259,
          left: 0,
          isTurned: false,
          cardItemName: 'VR一体机'
        },
        {
          frontImage: prize_item_bg,
          backgroundImage: prize_item_bg, // 背景图片
          top: 259,
          left: 193,
          isTurned: false,
          cardItemName: '运动装备'
        },
        {
          frontImage: prize_item_bg,
          backgroundImage: prize_item_bg, // 背景图片
          top: 259,
          left: 386,
          isTurned: false,
          cardItemName: '没有中奖'
        }
      ]
    }
  },
  methods: {
    // 抽奖
    turnLuckyCard(cardIndex) {
      // var _self = this
      // 换点中那张卡片背后的图片
      this.cardList[cardIndex].backgroundImage = prize_img
      this.cardList[cardIndex].isTurned = true

      // TODO:中奖弹框
    },
    getLuckyInfo() {
      // this.$store.dispatch('getLuckyInfo').then(()=>{ //抽奖接口
      // });
    }
  }
}
</script>

<style rel="stylesheet/scss" scoped lang="scss">
.fp-con {
  background-image: url('../../assets/images/prize_bg.png');
  background-size: 100% 100%;
  width: 100%;
  min-height: calc(100vh - 50px);

  .header-wrapper {
    padding: 230px 30px 0;
    .rest-opportunity {
      font-size: 19px;
      color: white;
      text-align: center;
    }

    .activity-time {
      background-image: url('../../assets/images/prize_time_bg.png');
      background-size: 100% 100%;
      height: 38px;
      line-height: 38px;
      text-align: center;
      font-size: 14px;
      color: #fbf8ee;
      margin-top: 10px;
    }
  }

  .pais-con {
    display: grid;
    padding: 20px 30px 0;
    grid-template-columns: repeat(3, 33.33%);
    // grid-template-rows: repeat(3, 33.33%);
    grid-row-gap: 16px;
    // grid-column-gap: 20px;
    justify-content: center;
    place-items: center;
    .card-li {
      width: 90px;
      height: 130px;
      overflow: hidden;
      // transition:all 0.1s;
      .fc_wrapper {
        width: 90px;
        height: 130px;
        perspective: 1000px;
      }
      .fztogether {
        transform: rotateY(-180deg) translateZ(0);
      }
      .fc_inner {
        position: relative;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        backface-visibility: hidden;
        transform-origin: center center;
        // transition:transform 0.5s;
      }
      .fc_front {
        position: absolute;
        z-index: 4;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        // opacity: 0;
      }
      .fc_back {
        position: absolute;
        z-index: 2;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transform-origin: center center;
        transform: rotateY(180deg);
        backface-visibility: hidden;
      }
      .fc_front img,
      .fc_back img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
