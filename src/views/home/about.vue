<!-- home -->
<template>
  <div class="about-container">
    <div class="warpper">
      <div class="list">
        <div class="logo"></div>
        <div class="demo-home__title">VUE H5开发模板</div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="wechat">
          <img :src="this.wechat" alt="" />
        </div>
        <div class="item">
          {{ userName }}
          <van-button v-if="userName == ''" type="warning" size="small" @click="doDispatch">快点我~</van-button>
        </div>
      </div>
      <van-uploader accept="*.*">
        <van-button icon="plus" type="primary">上传文件</van-button>
      </van-uploader>
    </div>
  </div>
</template>

<script>
// 请求接口
import { login } from '@/api/user.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      wechat: `${this.$cdn}/wx/640.gif`
    }
  },
  computed: {
    ...mapGetters(['userName'])
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 请求数据案例
    initData() {
      // 请求接口数据，仅作为展示，需要配置src->config下环境文件
      /*    userName	是	string	V32	用户名
      appName	否	string	V32		zjy
      password	否	string	V32	密码
      authCode	否	string	V32	短信验证码	密码和短信验证码二者必填其一
      loginPlatform	否	string	V32	登录平台	0：其他，1：官网登录
      systemFlag	o是	string	V32	系统标识	zjyapp
      orderNo	否	string	V32		订单号 */
      const params = {
        userName: '13913967638',
        appName: 'zjy',
        password: '',
        authCode: '000000',
        loginPlatform: '0', // 0：其他，1：官网登录
        systemFlag: 'zjyapp',
        orderNo: ''
      }
      login(params)
        .then(res => {
          console.log(res)
        })
        .catch(() => {})
    },
    // Action 通过 store.dispatch 方法触发
    doDispatch() {
      this.$store.dispatch('setUserName', 'Welcome my friend')
    },
    goGithub(index) {
      window.location.href = 'https://github.com/ian-kevin126'
    }
  }
}
</script>
<style lang="scss">
.about-container {
  /* 你的命名空间 */
  background: #fff;
  height: 100vh;
  box-sizing: border-box;
  .warpper {
    padding: 50px 12px 12px 12px;
    .list {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #666;
      font-size: 14px;
      .demo-home__title {
        margin: 0 0 6px;
        font-size: 32px;
        .demo-home__title img,
        .demo-home__title span {
          display: inline-block;
          vertical-align: middle;
        }
      }
      .item {
        font-size: 14px;
        line-height: 34px;
        a {
          text-decoration: underline;
        }
        .van-button {
          /* vant-ui 元素*/
          background: #ff5500;
        }
      }

      .logo {
        width: 120px;
        height: 120px;
        background: url($cdn + '/weapp/logo.png') center / contain no-repeat;
      }
      .wechat {
        width: 200px;
        height: 200px;
        img {
          width: 100%;
          height: auto;
        }
      }
    }
  }
}
</style>
