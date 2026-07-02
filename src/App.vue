<template>
  <div id="app">
    <Head />
    <div class="container">
      <el-row :gutter="30">
        <el-col
          :sm="24"
          :md="16"
          style="transition: all 0.5s ease-out; margin-bottom: 30px"
        >
          <router-view />
        </el-col>
        <el-col :sm="24" :md="8">
          <Right />
        </el-col>
      </el-row>
    </div>
    <Foot />
  </div>
</template>

<script>
import Head from './components/head/index'
import Foot from './components/foot/index'
import Right from './components/right/index'
import {mapActions} from 'vuex'
export default {
  name: 'App',
  components: {
    Head,
    Foot,
    Right
  },
  data() {
    return {
      // socket参数
      socket: null,
      timeout: 10 * 1000, // 45秒一次心跳
      timeoutObj: null, // 心跳心跳倒计时
      serverTimeoutObj: null, // 心跳倒计时
      timeoutnum: null, // 断开 重连倒计时
      lockReconnect: false, // 防止
      websocket: null
    }
  },
  created() {
    this.initWebSocket()
  },
  methods: {
    ...mapActions('user', ['recordOnline']),
    initWebSocket(supplierId) {
      // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
      let wsUrl = `ws://www.bytealien.com/ws`
      if (document.location.protocol === 'https:') {
        wsUrl = `wss://www.bytealien.com/ws`
      }
      this.websocket = new WebSocket(wsUrl)
      this.websocket.onopen = this.websocketonopen
      this.websocket.onerror = this.websocketonerror
      this.websocket.onmessage = this.setOnmessageMessage
      this.websocket.onclose = this.websocketclose
      this.$global.setWs(this.websocket)
      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      // window.onbeforeunload = that.onbeforeunload
    },
    start() {
      // 清除延时器
      this.timeoutObj && clearTimeout(this.timeoutObj)
      this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj)
      this.timeoutObj = setTimeout(() => {
        if (this.websocket && this.websocket.readyState === 1) {
          this.websocket.send('heartBath')// 发送消息，服务端返回信息，即表示连接良好，可以在socket的onmessage事件重置心跳机制函数
        } else {
          this.reconnect()
        }
        // 定义一个延时器等待服务器响应，若超时，则关闭连接，重新请求server建立socket连接
        this.serverTimeoutObj = setTimeout(() => {
          this.websocket.close()
        }, this.timeout)
      }, this.timeout)
    },
    reset() { // 重置心跳
      // 清除时间
      clearTimeout(this.timeoutObj)
      clearTimeout(this.serverTimeoutObj)
      // 重启心跳
      this.start()
    },
    // 重新连接
    reconnect() {
      if (this.lockReconnect) return
      this.lockReconnect = true
      // 没连接上会一直重连，设置延迟避免请求过多
      this.timeoutnum && clearTimeout(this.timeoutnum)
      this.timeoutnum = setTimeout(() => {
        this.initWebSocket()
        this.lockReconnect = false
      }, 5000)
    },
    async setOnmessageMessage(event) {
      console.log(event.data, '获得消息')
      this.recordOnline(event.data)
      this.reset()
      // 自定义全局监听事件
      window.dispatchEvent(new CustomEvent('onmessageWS', {
        detail: {
          data: event.data
        }
      }))
    },
    websocketonopen() {
      // 开启心跳
      this.start()
      console.log('WebSocket连接成功!!!' + new Date() + '----' + this.websocket.readyState)
    },
    websocketonerror(e) {
      console.log('WebSocket连接发生错误' + e)
    },
    websocketclose(e) {
      this.websocket.close()
      clearTimeout(this.timeoutObj)
      clearTimeout(this.serverTimeoutObj)
      console.log('WebSocket连接关闭')
    },
    websocketsend(messsage) {
      this.websocket.send(messsage)
    },
    closeWebSocket() { // 关闭websocket
      this.websocket.close()
    }
  }
}

</script>

<style lang="less">
@import url('@/assets/css/reset.less');
// 主色
@tcolors: #40b8c5; //按钮和标签颜色
@tcolorm: #e85d75; //分类的选中的颜色
@tcolord: #267c89; //按钮hover 的颜色

// /***** 粉红色主题****/
// @tcolors:#97dffd;//按钮和标签颜色
// @tcolorm:#64609E;//分类的选中的颜色
// @tcolord:#48456D;//按钮hover 的颜色
//
// /******淡黄色主题*****/
// @tcolors:#97dffd;//按钮和标签颜色
// @tcolorm:#64609E;//分类的选中的颜色
// @tcolord:#48456D;//按钮hover 的颜色
//
// /****** 淡紫色主题 ****/
// @tcolors:#97dffd;//按钮和标签颜色
// @tcolorm:#64609E;//分类的选中的颜色
// @tcolord:#48456D;//按钮hover 的颜色
body {
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, 'STHeiti', Helvetica, sans-serif;
  background: #f6f8fb;
  font-size: 14px;
  color: #1f2937 !important;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  -webkit-overflow-x: hidden;
  -webkit-tap-highlight-color: transparent;
}

* {
  box-sizing: border-box;
}

#app {
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  overflow-x: hidden;
  -webkit-overflow-x: hidden;
  color: #1f2937;
}
.container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 18px;
  /* overflow-x: hidden; */
  /* -webkit-overflow-x: hidden; */
}

/* //时间和标题 */
.s-round-date {
  position: absolute;
  top: 22px;
  left: 22px;
  height: 58px;
  width: 58px;
  padding-top: 7px;
  border-radius: 8px;
  color: #267c89;
  background: #eefbfc;
  border: 1px solid rgba(64, 184, 197, 0.24);
  box-shadow: none;
}
.s-round-date span {
  text-align: center;
  display: block;
}
.s-round-date .day {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.05;
}
.s-round-date .month {
  color: #64748b;
  font-size: 12px;
}
/* // 相同的标题副标题 */
.tcommonBox {
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
  position: relative;
  background: #fff;
  padding: 26px 28px 24px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 8px;
  margin-bottom: 24px;
  font-size: 15px;
  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.045);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.s-item.tcommonBox {
  padding-left: 100px;
}
.tcommonBox:hover {
  transform: translateY(-2px);
  border-color: rgba(64, 184, 197, 0.28);
  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.07);
}

// .s-item .article-content {
//   font-size: 15px;
//   white-space: normal;
//   word-wrap: break-word;
//   word-break: break-all;
// }
// /* //标题和按钮 */
// .s-item .article-content p {
//   margin: 10px 0;
//   line-height: 24px;
// }
.s-item .viewdetail {
  margin: 18px 0 2px;
  line-height: 24px;
  text-align: left;
}
.s-item .viewdetail a {
  color: #fff;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 5px;
}

.viewmore {
  text-align: center;
  width: 100%;
}
.viewmore a {
  /*background:  #97dffd;*/
  /*padding:6px 0;*/
  border-radius: 5px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  height: 30px;
  line-height: 30px;
  display: block;
}

.tcolors {
  color: @tcolors;
}
.tcolorm {
  color: @tcolorm;
}
.tcolord {
  color: @tcolord;
}
.tcolors-bg {
  background: @tcolors;
  transition: all 0.3s ease-in-out;
}
.tcolord-bg {
  background: @tcolord;
}
.tcolors-bg:hover {
  background: @tcolord;
  box-shadow: 0 8px 18px rgba(38, 124, 137, 0.16);
}

.paginationBox li.active {
  background: @tcolorm;
}
.paginationBox li:hover {
  color: @tcolord;
}
.el-pagination button:hover {
  color: @tcolord;
}

.fitImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.maxW {
  max-width: 100%;
}
.fwb {
  font-weight: bold;
}
.right {
  float: right;
}
.left {
  float: left;
}
.btnone {
  border-top: none !important;
}
.brone {
  border-right: medium none !important;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
.smalltitle {
  /*height:36px;*/
  /*line-height: 36px;*/
}

.logoImg {
  width: 160px;
  height: 50px;
  display: inline-block;
  padding: 5px 5px;
  vertical-align: top;
}

.logoImg img {
  width: 100%;
  height: 100%;
}

//公共标签
.ui.label {
  border: 1px solid rgba(64, 184, 197, 0.22);
  box-shadow: none;
  background-color: #eefbfc;
  margin: 8px 0 14px 0;
  font-size: 13px;
  position: relative;
  left: 0;
  border-radius: 999px;
  padding: 7px 12px;
  display: inline-block;
  color: #267c89;
  font-weight: 600;
}
.ui.label::after {
  display: none;
}
.ui.label a {
  color: #267c89;
  line-height: 100%;
}

#nprogress .bar {
  background: @tcolorm !important; //自定义颜色
}
</style>
<style lang="less">
@media screen and (max-width: 500px) {
  //500px 手机尺寸
  .dlikeColBox {
    //点赞收藏手机端换行
    display: block !important;
    float: none !important;
    margin: 10px auto !important;
    text-align: center !important;
  }
  .el-message-box {
    //提示弹框手机框展示
    max-width: 80%;
  }
  .userInfoBox .el-input,
  .userInfoBox .el-textarea {
    //用户中心表框
    max-width: 280px !important;
  }
  .userInfoBox li {
    //li 更改padding  缩小距离
    padding: 15px 10px !important;
  }
  .userInfoBox li .el-radio-group .el-radio {
    //标签样式调整
    margin-left: 15px !important;
    margin-bottom: 5px;
  }
  .tFriendsBox .tf-item a {
    //好友列表自适应缩小尺寸
    padding: 0 5px 0 60px !important;
    img {
      width: 50px !important;
      height: 50px !important;
      left: 5px !important;
    }
  }
}
@media screen and (max-width: 700px) {
  .pc-head {
    display: none;
  }
  .h5-head {
    //手机端导航栏显示
    display: block;
  }
  .headImgBox {
    height: 390px !important;
    margin-bottom: 28px !important;
  }
  .h-information {
    display: block;
    top: 250px !important;
    padding: 0 18px !important;
  }
  .h-information img {
    width: 64px !important;
    height: 64px !important;
    border-width: 3px !important;
  }
  .h-description {
    margin-top: 10px !important;
  }
  .h-description span {
    font-size: 15px !important;
    line-height: 1.45 !important;
  }
  .headImgBox .scene {
    font-size: 30px !important;
    top: 112px !important;
    line-height: 1.2 !important;
  }
}

@media screen and (min-width: 701px) {
  .headBox {
    display: block;
  }
  .mobileBox {
    display: none;
  }
}
@media screen and (max-width: 800px) {
  .container {
    max-width: 100% !important;
    margin: 0 auto;
    padding: 0 14px;
  }
  .s-round-date {
    position: static;
    width: auto !important;
    height: auto;
    display: inline-flex;
    align-items: baseline;
    gap: 4px;
    padding: 6px 9px;
    margin-bottom: 12px;
    border-radius: 999px;
  }
  .s-round-date .month,
  .s-round-date .day {
    font-size: 12px;
    line-height: 1;
  }
  .tcommonBox {
    padding: 18px;
    margin-bottom: 18px;
  }
  .s-item.tcommonBox {
    padding-left: 18px;
  }
  .ui.label {
    left: 0 !important;
    padding-left: 12px !important;
  }
  .ui.label::after {
    border: none !important;
  }
  .headBox li.el-menu-item,
  .headBox .el-submenu__title {
    padding: 0 15px;
  }
  .toTop {
    display: none !important;
  }
  //隐藏上滑图标
  .hidden {
    display: none !important;
  }
}
@media screen and (min-width: 801px) {
  .headBox li.el-menu-item,
  .headBox .el-submenu__title {
    padding: 0 12px;
  }
}
@media screen and (min-width: 991px) {
  .headBox li.el-menu-item,
  .headBox .el-submenu__title {
    padding: 0 20px;
  }
}
</style>
