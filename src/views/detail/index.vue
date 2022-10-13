<!-- 文章详情模块 -->
<template>
  <div class="detailBox tcommonBox">
    <div v-if="!title" ref="loading" class="detail-loading" />
    <articleHead v-show="title" :item="detailObj" />
    <Content :content="content" />
    <div class="dshareBox bdsharebuttonbox" data-tag="share_1">
      <div class="dlikeColBox">
        <div class="dlikeBox" @click="likecollectHandle(1)">
          <i :class="likeArt ? 'fa fa-fw fa-heart' : 'fa fa-fw fa-heart-o'" />
          喜欢 | {{ detailObj.likeCount }}
        </div>
        <div class="dcollectBox" @click="likecollectHandle(2)">
          <i :class="collectArt ? 'fa fa-fw fa-star' : 'fa fa-fw fa-star-o'" />
          收藏 | {{ detailObj.collectCount }}
        </div>
      </div>
    </div>
    <div class="donate">
      <div class="donate-word">
        <span @click="pdonate = !pdonate">赞赏</span>
      </div>
      <el-row :class="pdonate ? 'donate-body' : 'donate-body donate-body-show'" :gutter="30">
        <el-col :span="12" class="donate-item">
          <div class="donate-tip">
            <img :src="wechatImage" alt="wechat pay">
            <span>微信扫一扫，向我赞赏</span>
          </div>
        </el-col>
        <el-col :span="12" class="donate-item">
          <div class="donate-tip">
            <img :src="aliPayImage" alt="alipay">
            <span>支付宝扫一扫，向我赞赏</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <Message :id="id" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { MessageBox } from 'element-ui'
import articleAPI from '@/api/article'
import likeAPI from '@/api/like'
import { initDate } from '@/utils'
import articleHead from '@/components/articleHead'
import Message from '@/components/message'
import Content from '@/components/content'
import { cloneDeep } from 'lodash'
import rewardAPI from '@/api/reward'

export default {
  name: 'Detail',
  components: {
    // 定义组件
    articleHead,
    Message,
    Content
  },
  data() {
    // 选项 / 数据
    return {
      pdonate: true, // 打开赞赏控制,
      detailObj: {}, // 返回详情数据
      likeArt: false, // 是否点赞
      likeCount: 400, // 点赞数量
      collectCount: 500, // 收藏数量
      collectArt: false, // 是否收藏
      create_time: '',
      content: '',
      id: '',
      title: '',
      wechatImage: '',
      aliPayImage: ''
    }
  },
  computed: {
    ...mapState('user', ['haslogin'])
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: 'routeChange'
  },
  async created() {
    // 生命周期函数
    await this.routeChange()
    await this.getReward()
  },
  methods: {
    // 事件处理器
    ...mapActions('user', ['login']),
    showInitDate: initDate,
    async likecollectHandle(islike) {
      // 用户点击喜欢0,用户点击收藏1
      if (this.haslogin) {
        // 判断是否登录
        let tip = ''
        let res
        if (islike === 1) {
          if (!this.likeArt) {
            this.likeCount += 1
            this.likeArt = true
            tip = '已点赞'
          } else {
            this.likeCount -= 1
            this.likeArt = false
            tip = '已取消点赞'
          }
          res = await likeAPI.edit({ id: this.id, value: this.likeArt, isLike: true })
        } else {
          if (!this.collectArt) {
            this.collectCount += 1
            this.collectArt = true
            tip = '已收藏'
          } else {
            this.collectCount -= 1
            this.collectArt = false
            tip = '已取消收藏'
          }
          res = await likeAPI.edit({ id: this.id, value: this.collectArt, isLike: false })
        }
        if (res.code === 0) {
          this.$message({
            message: tip,
            type: 'success'
          })
          await this.getInfo(this.id)
        }
      } else {
        // 未登录 前去登录。
        MessageBox.confirm('登录后即可点赞和收藏，是否前往登录页面?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            // 确定，跳转至登录页面
            // 储存当前页面路径，登录成功后跳回来
            localStorage.setItem('logUrl', this.$route.fullPath)
            this.login()
          })
          .catch(() => {
            // 取消关闭弹窗
          })
      }
    },
    async getInfo(id) {
      try {
        const res = await articleAPI.getInfo({ id })
        this.detailObj = cloneDeep(res.obj)
        this.title = this.detailObj.title
        this.content = this.detailObj.content
        if (this.haslogin) {
          const data = await likeAPI.getInfo({ id })
          this.likeArt = data.like
          this.collectArt = data.collect
        }
      } catch (e) {
        await this.$router.push({name: 'Home'})
      }
      this.$nextTick(() => {
        this.loadingInstance && this.loadingInstance.close()
      })
    },
    async routeChange() {
      this.loadingInstance = this.$loading({ target: this.$refs.loading })
      this.id = this.$route.params.id
      console.log(this.$route)
      await this.getInfo(this.id)
    },
    async getReward() {
      const res = await rewardAPI.getRewardList()
      this.wechatImage = res.wechatImage
      this.aliPayImage = res.aliPayImage
    }
  }
}
</script>

<style lang="less">
.detailBox .viewdetail {
  margin: 10px 0;
  line-height: 24px;
  text-align: center;
}
/*分享图标*/
.dshareBox {
  margin-top: 40px;
  position: relative;
  display: flex;
  justify-content: flex-end;
}

/*点赞 收藏*/
.dlikeColBox {
}
.dlikeBox,
.dcollectBox {
  display: inline-block;
  padding: 0 10px;
  height: 35px;
  color: #e26d6d;
  line-height: 35px;
  border-radius: 35px;
  border: 1px solid #e26d6d;
  cursor: pointer;
  margin-left: 10px;
}

/*赞赏*/
.donate-word {
  margin: 40px 0;
  text-align: center;
}
.donate-word span {
  display: inline-block;
  width: 80px;
  height: 34px;
  line-height: 34px;
  color: #fff;
  background: #e26d6d;
  margin: 0 auto;
  border-radius: 4px;
  cursor: pointer;
}
.donate-body {
  display: none;
}
.donate-body-show {
  display: block;
}
.donate-item {
  text-align: right;
}
.donate-item:last-child {
  text-align: left;
}
.donate-item img {
  width: 100%;
  display: block;
  height: auto;
}
.donate-item div {
  display: inline-block;
  width: 150px;
  padding: 0 6px;
  box-sizing: border-box;
  text-align: center;
}
.donate-item div span {
  display: inline-block;
  width: 100%;
  margin: 10px 0;
  text-align: center;
}
.donate-body .donate-item:first-of-type div {
  color: #44b549;
}
.donate-body .donate-item:nth-of-type(2) div {
  color: #00a0e9;
}

.bd_weixin_popup {
  position: fixed !important;
}
.detail-loading {
  height: 500px;
}
</style>
