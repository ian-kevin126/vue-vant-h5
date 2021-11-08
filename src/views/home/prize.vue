<template>
  <div class="fp-con">
    <!-- 牌 -->
    <div class="ab pais-con">
      <div
        class="ab card-li"
        v-for="(item, index) in cardList"
        :key="item.index"
        :id="index"
        v-bind:style="{ top: item.top + 'px', left: item.left + 'px', transition: 'all ' + paidongtime + 's' }"
      >
        <div class="fc_wrapper" @click="lotCard(index)">
          <div
            class="fc_inner"
            v-bind:class="{ fztogether: item.iszhuan }"
            v-bind:style="{ transition: 'transform ' + fptime + 's' }"
          >
            <div class="fc_front"><img :src="item.frontimg" /></div>
            <div class="fc_back"><img :src="cardbeimian" /></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 牌 按钮 -->
    <img class="ab paibtn" @click="shuffleCards" src="../../assets/images/p_cardbtn.png" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
const p_cardbg = require('../../assets/images/p_cardbg.png')
const p_card01 = require('../../assets/images/p_card01.png')
const p_card03 = require('../../assets/images/p_card03.png')
const p_card04 = require('../../assets/images/p_card04.png')
const p_card02 = require('../../assets/images/p_card02.png')
const p_card06 = require('../../assets/images/p_card06.png')
const p_cardno = require('../../assets/images/p_cardno.png')
export default {
  name: 'LuckyTurn',
  components: {},
  data() {
    return {
      cardbeimian: p_cardbg, // 卡片背面
      fptime: 0.5, // 翻牌时间 单位s
      paidongtime: 0.1, // 洗牌速度 单位s
      xipaicount: 3, // 洗牌次数 洗牌时间＝洗牌速度＊洗牌次数
      paitop_max: 250, // 洗牌随机位置 最大top值
      paitop_min: 10, // 洗牌随机位置 最小top值
      paileft_max: 360, // 洗牌随机位置 最大left值
      paileft_min: 10, // 洗牌随机位置 最小left值
      nolotindex: 5, // 没有中奖的卡片在cardArr数组中的位置

      isxipai: false, // false:奖品面展示 true:卡背面
      iscanclick: false, // 卡片是否可以点击
      cardList: [
        {
          frontimg: p_card01, // 奖品图片
          top: 0, // 位置
          left: 0, // 位置
          iszhuan: false, // false:奖品面展示 true:卡背面
          pname: '手机' // 奖品名字
        },
        {
          frontimg: p_card03,
          top: 0,
          left: 193,
          iszhuan: false,
          pname: '耳机'
        },
        {
          frontimg: p_card04,
          top: 0,
          left: 386,
          iszhuan: false,
          pname: '优惠券'
        },
        {
          frontimg: p_card02,
          top: 259,
          left: 0,
          iszhuan: false,
          pname: 'VR一体机'
        },
        {
          frontimg: p_card06,
          top: 259,
          left: 193,
          iszhuan: false,
          pname: '运动装备'
        },
        {
          frontimg: p_cardno,
          top: 259,
          left: 386,
          iszhuan: false,
          pname: '没有中奖'
        },
        {
          frontimg: p_card02,
          top: 259,
          left: 0,
          iszhuan: false,
          pname: 'VR一体机'
        },
        {
          frontimg: p_card06,
          top: 259,
          left: 193,
          iszhuan: false,
          pname: '运动装备'
        },
        {
          frontimg: p_cardno,
          top: 259,
          left: 386,
          iszhuan: false,
          pname: '没有中奖'
        }
      ] // 卡片对应奖品信息
    }
  },
  methods: {
    rd(n, m) {
      var c = m - n + 1
      return Math.floor(Math.random() * c + n)
    },
    creatCardList() {
      var list = []
      this.cardList.forEach((ele, index) => {
        list.push(index)
      })
      return list
    },
    deepClone(source) {
      // 对象深拷贝
      if (!source || typeof source !== 'object') {
        throw new Error('error arguments', 'shallowClone')
      }
      var targetObj = source.constructor === Array ? [] : {}
      for (var keys in source) {
        if (Object.prototype.hasOwnProperty.call(source, keys)) {
          if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = source[keys].constructor === Array ? [] : {}
            targetObj[keys] = this.deepClone(source[keys])
          } else {
            targetObj[keys] = source[keys]
          }
        }
      }
      return targetObj
    },
    cbSettimeout(waittime) {
      setTimeout(() => {
        this.cardList.forEach((ele, index) => {
          document.getElementById(index).style.top = this.rd(this.paitop_min, this.paitop_max) + 'px'
          document.getElementById(index).style.left = this.rd(this.paileft_min, this.paileft_max) + 'px'
        })
      }, waittime)
    },
    // 洗牌
    shuffleCards() {
      // var _self = this
      // this.$store.dispatch('whickToast',{isShowToast:true,type:0});//没有抽奖机会弹窗

      // 重置奖品
      this.cardList = [
        {
          frontimg: p_card01,
          top: 0,
          left: 0,
          iszhuan: true, // 这里要为true
          pname: '手机'
        },
        {
          frontimg: p_card03,
          top: 0,
          left: 193,
          iszhuan: true,
          pname: '耳机'
        },
        {
          frontimg: p_card04,
          top: 0,
          left: 386,
          iszhuan: true,
          pname: '优惠券'
        },
        {
          frontimg: p_card02,
          top: 259,
          left: 0,
          iszhuan: true,
          pname: 'VR一体机'
        },
        {
          frontimg: p_card06,
          top: 259,
          left: 193,
          iszhuan: true,
          pname: '运动装备'
        },
        {
          frontimg: p_cardno,
          top: 259,
          left: 386,
          iszhuan: true,
          pname: '没有中奖'
        },
        {
          frontimg: p_card02,
          top: 259,
          left: 0,
          iszhuan: true,
          pname: 'VR一体机'
        },
        {
          frontimg: p_card06,
          top: 259,
          left: 193,
          iszhuan: true,
          pname: '运动装备'
        },
        {
          frontimg: p_cardno,
          top: 259,
          left: 386,
          iszhuan: true,
          pname: '没有中奖'
        }
      ]
      // 洗牌
      for (var i = 0; i < this.xipaicount; i++) {
        var wtime = this.fptime * 1000 + 1000 * i * this.paidongtime
        this.cbSettimeout(wtime)
      }
      // 洗完牌，牌随机摆放
      var nownumArr = this.creatCardList() // 一个一个配对成功 一个一个删除
      setTimeout(() => {
        this.cardList.forEach((ele, index) => {
          var the_nownumArr_index = this.rd(0, nownumArr.length - 1)
          var now_random = nownumArr[the_nownumArr_index]
          nownumArr.splice(the_nownumArr_index, 1) // 这个位置已经被用 避免重复 所以删除

          document.getElementById(index).style.top = this.cardList[now_random].top + 'px'
          document.getElementById(index).style.left = this.cardList[now_random].left + 'px'
        })
        this.iscanclick = true
      }, this.xipaicount * this.paidongtime * 1000 + this.fptime * 1000)
    },
    lotCard(numindex) {
      var _self = this
      if (!this.iscanclick) return
      // 抽奖操作
      this.iscanclick = false

      // 换背面图片 start
      var pnameIndex = 0 // 中奖的是 this.cardArr数组里面的哪个
      // 换点中那张卡片背后的图片
      this.cardList.forEach((element, index) => {
        // 没有中奖
        if (this.actInfo.nowprize_name === '') {
          // console.log(document.getElementById(numindex).style.top);
          // console.log(document.getElementById(numindex).style.left);
          // return;
          // todo numindex 不对 dom位置没有变，只是位置变了
          pnameIndex = this.nolotindex
          this.cardList[numindex].frontimg = element.frontimg
        }
        // 中奖
        if (this.actInfo.nowprize_name.indexOf(element.pname) !== -1) {
          this.cardList[numindex].frontimg = element.frontimg
          pnameIndex = index
        }
      })

      var xuanArrbefore = this.creatCardList()
      xuanArrbefore.splice(pnameIndex, 1)
      var fuzhiArrbefore = this.creatCardList()
      fuzhiArrbefore.splice(numindex, 1)
      // splice 由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。
      var xuanArr = this.deepClone(xuanArrbefore) // 剩余奖品(pname)索引 剩下可以随意打乱的 eg:没有中奖[0,1,2,3,4] 中手机[1,2,3,4]
      var fuzhiArr = this.deepClone(fuzhiArrbefore) // 剩余卡片(卡片位置)索引 去掉点击的那张卡片(numindex)
      console.log(pnameIndex, numindex)
      console.log(xuanArr)
      console.log(fuzhiArr)
      // 因为一一随机对应的时候，this.cardArr一直随着在变，所以定义一个cardImgArr
      var cardImgArr = [
        {
          frontimg: p_card01,
          top: 0,
          left: 0,
          iszhuan: false,
          pname: '手机'
        },
        {
          frontimg: p_card03,
          top: 0,
          left: 193,
          iszhuan: false,
          pname: '耳机'
        },
        {
          frontimg: p_card04,
          top: 0,
          left: 386,
          iszhuan: false,
          pname: '优惠券'
        },
        {
          frontimg: p_card02,
          top: 259,
          left: 0,
          iszhuan: false,
          pname: 'VR一体机'
        },
        {
          frontimg: p_card06,
          top: 259,
          left: 193,
          iszhuan: false,
          pname: '运动装备'
        },
        {
          frontimg: p_cardno,
          top: 259,
          left: 386,
          iszhuan: false,
          pname: '没有中奖'
        },
        {
          frontimg: p_card02,
          top: 259,
          left: 0,
          iszhuan: false,
          pname: 'VR一体机'
        },
        {
          frontimg: p_card06,
          top: 259,
          left: 193,
          iszhuan: false,
          pname: '运动装备'
        },
        {
          frontimg: p_cardno,
          top: 259,
          left: 386,
          iszhuan: false,
          pname: '没有中奖'
        }
      ]
      // fuzhiArr和xuanArr随机对应
      fuzhiArr.forEach(item => {
        // 随机从xuanArr取一个
        var rdnum = _self.rd(0, xuanArr.length - 1)
        var nnn = xuanArr[rdnum]

        _self.cardList[item].frontimg = cardImgArr[nnn].frontimg
        _self.cardList[item].pname = cardImgArr[nnn].pname

        xuanArr.splice(rdnum, 1)
      })
      // 换背面图片 end

      // 背面图片整理完毕 抽中的牌先转向用户
      this.cardList[numindex].iszhuan = false
      // 剩余奖牌转向用户
      setTimeout(() => {
        this.cardList.forEach((ele, index) => {
          ele.iszhuan = false
        })
      }, this.fptime * 1000 + 100)
      // 中奖弹框
      setTimeout(() => {
        if (this.actInfo.is_nowprize) {
          this.$store.dispatch('whickToast', { isShowToast: true, type: 2 })
        } else {
          this.$store.dispatch('whickToast', { isShowToast: true, type: 1 })
        }
      }, this.fptime * 1000 + 1000)
    },
    lotFanpai() {
      // this.$store.dispatch('goLotcard').then(()=>{ //抽奖接口
      // });
    },
    ...mapActions({
      setDialog: 'setDialog',
      setMum: 'setMum'
    })
  },
  computed: {
    ...mapGetters({
      actInfo: 'actInfo',
      isShowToast: 'isShowToast'
    })
  }
  // mounted: function () {}
}
</script>

<style rel="stylesheet/scss" scoped lang="scss">
.pais-con {
  display: grid;
  margin: 20px 30px;
  grid-template-columns: repeat(3, 33.33%);
  // grid-template-rows: repeat(3, 33.33%);
  grid-row-gap: 20px;
  // grid-column-gap: 20px;
  justify-content: center;
  place-items: center;
  .card-li {
    width: 86px;
    height: 120px;
    overflow: hidden;
    // transition:all 0.1s;
    .fc_wrapper {
      width: 86px;
      height: 120px;
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
.paibtn {
  width: 338px;
  height: 65px;
  top: 580px;
  left: 206px;
}
</style>
