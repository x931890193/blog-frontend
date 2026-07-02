<template>
  <div>
    <div class="headBack">
      <el-row class="container">
        <el-col :span="24">
          <!-- pc端导航 -->
          <PCHead
            class="pc-head"
            :activeIndex="activeIndex"
            :projectList="projectList"
            :haslogin="haslogin"
            @searchEnterFun="searchEnterFun"
            @searchChangeFun="searchChangeFun"
            @logoinFun="login"
            @goHandle="goHandle"
            @userlogout="userlogout"
          />
          <!-- 移动端 -->
          <H5Head
            class="h5-head"
            :activeIndex="activeIndex"
            :projectList="projectList"
            :haslogin="haslogin"
            @searchEnterFun="searchEnterFun"
            @searchChangeFun="searchChangeFun"
            @logoinFun="login"
            @userlogout="userlogout"
          />
        </el-col>
      </el-row>
    </div>
    <div class="headImgBox">
      <div class="scene">
        <div>
          <span>ByteAlien</span>
        </div>
      </div>
      <div class="h-information">
        <span @click="goHandle({ name: 'Aboutme' })">
          <img src="@/assets/img/tou.png" alt>
        </span>
        <div class="h-description">
          <span @click="goHandle({ name: 'Aboutme' })">Write the Code. Change the World.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { MessageBox } from 'element-ui'
import H5Head from './components/h5-head.vue'
import PCHead from './components/pc-head.vue'
import { projectList } from '@/utils/constants'

export default {
  name: 'Head',
  components: {
    H5Head,
    PCHead
  },
  data() {
    return {
      activeIndex: '/',
      projectList,
      searchkey: '',
      pMenu: true // 手机端菜单打开
    }
  },
  computed: {
    ...mapState('user', ['haslogin']),
    ...mapGetters(['sidebar', 'username', 'userId', 'avatar'])
  },
  async created() {
    this.activeIndex =
      '/' +
      (window.location.hash.split('/').length > 1
        ? window.location.hash.split('/')[1]
        : '')
    // console.log('path', this.activeIndex)
    this.changeTitle()
    this.setLogId()
    await this.getActiveCate()
  },
  methods: {
    ...mapActions('user', ['getInfo', 'login', 'logout']),
    ...mapActions('common', ['getActiveCate']),
    ...mapActions('app', ['setLogId']),
    searchEnterFun() {
      // console.log('9999', this.searchkey)
      if (this.searchkey) {
        this.$router.push({
          name: 'Home',
          query: {
            keywords: this.searchkey
          }
        })
      }
    },
    searchChangeFun(value) {
      this.searchkey = value
      // console.log('999988', this.searchkey)
      if (!this.searchkey) {
        this.$router.push({ name: 'Home' })
      }
    },
    logoinFun() {
      this.login()
    },
    async userlogout() {
      MessageBox.confirm('是否确认退出?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await this.logout()
      })
    },
    goHandle(path) {
      if (path.name === this.$route.name && path.query.like === this.$route.query.like) {
        return
      }
      this.$router.push(path)
    },
    changeTitle() {
      var hiddenProperty =
        'hidden' in document
          ? 'hidden'
          : 'webkitHidden' in document
            ? 'webkitHidden'
            : 'mozHidden' in document
              ? 'mozHidden'
              : null
      var visibilityChangeEvent = hiddenProperty.replace(
        /hidden/i,
        'visibilitychange'
      )
      var onVisibilityChange = () => {
        if (document[hiddenProperty]) {
          // 被隐藏
          document.title = 'ByteAlien'
        } else {
          document.title = 'Write the Code. Change the World.'
        }
      }
      document.addEventListener(visibilityChangeEvent, onVisibilityChange)
    }
  }
}
</script>

<style scoped lang="less">
/*********头部导航栏********/
/*头部导航栏盒子*/

.headBack {
  width: 100%;
  background: rgba(12, 19, 31, 0.7);
  /*margin-bottom:30px;*/
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 100;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

/*头部背景图*/

.headImgBox {
  height: 560px;
  position: relative;
  width: 100%;
  background-size: cover;
  background-position: center 50%;
  background-repeat: no-repeat;
  margin-bottom: 48px;
  overflow: hidden;
  background-image:
    linear-gradient(180deg, rgba(12, 19, 31, 0.58) 0%, rgba(12, 19, 31, 0.34) 48%, rgba(246, 248, 251, 0.96) 100%),
    url('./../../assets/img/headbg05.jpg');
}

.headImgBox::after {
  position: absolute;
  right: 8%;
  bottom: 34px;
  width: 280px;
  height: 1px;
  content: '';
  background: rgba(255, 255, 255, 0.45);
}

.h-information {
  position: absolute;
  top: 350px;
  left: 0;
  text-align: center;
  width: 100%;
  margin: 0;
  padding: 0 24px;
  font-size: 16px;
  opacity: 0.98;
  background: transparent;
  border-radius: 0;
  z-index: 1;
  animation: b 1s ease-out;
  -webkit-animation: b 1s ease-out;
}
.h-description {
  margin: 16px 0 0;
  span {
    display: inline-block;
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
    text-shadow: 0 8px 24px rgba(15, 23, 42, 0.38);
    letter-spacing: 0;
  }
}

@-webkit-keyframes b {
  0% {
    -webkit-transform: translateY(90px);
    transform: translateY(90px);
  }
  80% {
    -webkit-transform: translateY(5px);
    transform: translateY(5px);
  }
  90% {
    -webkit-transform: translateY(-5px);
    transform: translateY(-5px);
  }
  to {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

@keyframes b {
  0% {
    -webkit-transform: translateY(90px);
    transform: translateY(90px);
  }
  80% {
    -webkit-transform: translateY(5px);
    transform: translateY(5px);
  }
  90% {
    -webkit-transform: translateY(-5px);
    transform: translateY(-5px);
  }
  to {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

.h-information img {
  width: 86px;
  height: 86px;
  border-radius: 100%;
  transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.82);
  box-shadow: 0 16px 34px rgba(15, 23, 42, 0.24);
}

.h-information img:hover {
  transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
}

.h-information h2 {
  margin-top: 20px;
  font-size: 18px;
  font-weight: 700;
  /*font-family: 'Sigmar One';*/
}
.h-information h2 a {
  background: linear-gradient(to right, #40b8c5, #e85d75);
  -webkit-background-clip: text;
  color: transparent;
}
.headImgBox .scene {
  width: 100%;
  /*height:300px;*/
  text-align: center;
  font-size: 54px;
  font-weight: 800;
  color: #fff;
  position: absolute;
  left: 0;
  top: 145px;
  padding: 0 24px;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
  line-height: 1.2;
  text-shadow: 0 14px 32px rgba(15, 23, 42, 0.48);
  z-index: 1;
}

.headImgBox .scene span {
  transform: matrix(1, 0, 0, 1, 0, 0);
  -webkit-transform: matrix(1, 0, 0, 1, 0, 0);
  text-shadow: 0 14px 32px rgba(15, 23, 42, 0.48);
}

</style>
<style lang="less">
.login-dialog {
  .el-dialog__body {
    text-align: center;
  }
  .dialog-footer {
    span {
      margin: 0 10px;
    }
  }
}
</style>
