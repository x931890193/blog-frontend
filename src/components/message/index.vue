<!-- 留言评论模块 -->
<template>
  <div ref="tmsgBox" class="tmsgBox">
    <div ref="respondBox" class="tmsg-respond">
      <h3>
        发表评论
        <small v-show="isRespond" class="tcolorm" @click="removeRespond">取消回复</small>
      </h3>
      <transition name="comment-auth-fade">
        <div v-if="loginTipVisible" class="comment-auth-tip">
          <div class="comment-auth-icon">
            <i class="fa fa-github" />
          </div>
          <div class="comment-auth-copy">
            <strong>登录后再发表评论</strong>
            <span>授权完成后会回到当前页面，刚才输入的内容不会被提交。</span>
          </div>
          <div class="comment-auth-actions">
            <button type="button" class="comment-auth-primary" @click="goLogin">GitHub 登录</button>
            <button type="button" class="comment-auth-ghost" @click="closeLoginTip">稍后</button>
          </div>
        </div>
      </transition>
      <form class="" @submit.prevent>
        <el-input
          v-model="textarea"
          type="textarea"
          :rows="2"
          placeholder="说点什么呢``"
        />
        <div :class="pBody ? 'OwO' : 'OwO OwO-open'">
          <div class="OwO-logo" @click="pBody = !pBody">
            <span>OwO表情</span>
          </div>
          <div class="OwO-body">
            <ul class="OwO-items OwO-items-show">
              <li
                v-for="(oitem, index) in OwOlist"
                :key="'oitem' + index"
                class="OwO-item"
                @click="choseEmoji(oitem.title)"
              >
                <img
                  :src="require('@/assets/img/emot/image/' + oitem.url)"
                  alt=""
                >
              </li>
            </ul>
            <div class="OwO-bar">
              <ul class="OwO-packages">
                <li class="OwO-package-active">Emoji</li>
              </ul>
            </div>
          </div>
        </div>
        <el-row class="tmsg-r-info">
          <el-col :span="24" class="info-submit">
            <AButton size="large" @click="sendMsg">{{ sendTip }}</AButton>
          </el-col>
        </el-row>
      </form>
    </div>
    <div ref="listDom" class="tmsg-comments">
      <a href="#" class="tmsg-comments-tip">活捉 {{ total }} 条</a>
      <div class="tmsg-commentshow">
        <ul class="tmsg-commentlist">
          <li
            v-for="(item, index) in list"
            :key="'common' + index"
            class="tmsg-c-item"
          >
            <article class="">
              <header>
                <HeadImg :src="item.avatar" />
                <div class="i-name">
                  {{ item.username }}
                </div>
                <div v-show="item.label" class="i-class">
                  {{ item.label }}
                </div>
                <div v-show="item.os" class="i-class">{{ item.os }}</div>
                <div v-show="item.ua" class="i-class">{{ item.ua }}</div>
                <div v-show="item.ip" class="i-class">{{ item.ip }}</div>
                <div class="i-time">
                  <time>{{ initDate(item.createDate) }}  </time>
                </div>
              </header>
              <section>
                <p v-html="analyzeEmoji(item.content)" />
                <div
                  v-if="haslogin"
                  class="tmsg-replay"
                  @click="respondMsg($event, { leaveIndex: index, pIndex: -1, pid: item._id })"
                >
                  回复
                </div>
              </section>
            </article>
            <ul
              v-if="item.children && item.children.length > 0"
              class="tmsg-commentlist"
              style="padding-left: 60px"
            >
              <li
                v-for="(citem, cindex) in item.children"
                :key="'citem' + cindex"
                class="tmsg-c-item"
              >
                <article class="">
                  <header>
                    <HeadImg :src="citem.avatar" />
                    <div class="i-name">
                      {{ citem.username }} <span>回复</span>
                      {{ citem.parentUsername }}
                    </div>
                    <div v-show="citem.label" class="i-class">
                      {{ citem.label }}
                    </div>
                    <div v-show="citem.os" class="i-class">{{ citem.os }}</div>
                    <div v-show="citem.ua" class="i-class">{{ citem.ua }}</div>
                    <div v-show="citem.ip" class="i-class">{{ citem.ip }}</div>
                    <div class="i-time">
                      <time>{{ initDate(citem.createDate) }}</time>
                    </div>
                  </header>
                  <section>
                    <p v-html="analyzeEmoji(citem.content)">
                      {{ citem.content }}
                    </p>
                    <div
                      v-show="haslogin"
                      class="tmsg-replay"
                      @click="respondMsg($event, {leaveIndex: index, pIndex: cindex, pid: citem._id})"
                    >
                      回复
                    </div>
                  </section>
                </article>
                <ul
                  v-if="citem.children && citem.children.length > 0"
                  class="tmsg-commentlist"
                  style="padding-left: 60px"
                >
                  <li
                    v-for="(ccitem, ccindex) in citem.children"
                    :key="'ccitem' + ccindex"
                    class="tmsg-c-item"
                  >
                    <article class="">
                      <header>
                        <HeadImg :src="ccitem.avatar" />
                        <div class="i-name">
                          {{ ccitem.username }} <span>回复</span>
                          {{ ccitem.parentUsername }}
                        </div>
                        <div v-show="ccitem.label" class="i-class">
                          {{ ccitem.label }}
                        </div>
                        <div v-show="ccitem.os" class="i-class">{{ ccitem.os }}</div>
                        <div v-show="ccitem.ua" class="i-class">{{ ccitem.ua }}</div>
                        <div v-show="ccitem.ip" class="i-class">{{ ccitem.ip }}</div>
                        <div class="i-time">
                          <time>{{ initDate(ccitem.createDate) }}</time>
                        </div>
                      </header>
                      <section>
                        <p v-html="analyzeEmoji(ccitem.content)">
                          {{ ccitem.content }}
                        </p>
                        <div
                          v-show="false"
                          class="tmsg-replay"
                          @click="respondMsg($event, {leaveIndex: index, pIndex: cindex, ppIndex:ccindex, pid: ccitem._id})"
                        >
                          回复
                        </div>
                      </section>
                    </article>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <AButton v-show="hasMore" size="large" @click="addMoreFun">查看更多</AButton>
        <AButton v-show="!hasMore" size="large" @click="addMoreFun">没有更多</AButton>
      </div>
    </div>
  </div>
</template>

<script>
import Marked from 'marked'
import commentAPI from '@/api/comment'
import { OwOlist } from '@/utils/constants'
import { analyzeEmoji } from '@/utils'
import { mapActions, mapState } from 'vuex'
import { initDate } from '@/utils/index.js'
import AButton from '@/components/abutton'
import xss from 'xss'
import {Message} from 'element-ui'
import hljs from 'highlight.js'

Marked.setOptions({
  renderer: new Marked.Renderer(),
  highlight(code) {
    return hljs.highlightAuto(code).value
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

export default {
  name: 'Message',
  components: {
    // 定义组件
    AButton
  },
  // eslint-disable-next-line vue/require-prop-types
  props: {
    id: {
      // vue props type设置多个类型
      type: [Number, String, Object],
      required: true
    }
  },
  computed: {
    ...mapState('user', ['haslogin'])
  },
  // eslint-disable-next-line vue/order-in-components
  data() {
    // 选项 / 数据
    return {
      respondBox: '', // 评论表单
      listDom: '',
      tmsgBox: '', // 总评论盒子
      isRespond: false,
      textarea: '', // 文本框输入内容
      hasMore: true,
      leaveIndex: 0, // 赞赏等其他模块的分类id
      pIndex: -1,
      ppIndex: -1,
      pid: '', // 回复评论的一级commentId
      sendTip: '发送~',
      list: [],
      pBody: true,
      OwOlist,
      pageSize: 10,
      current: 1,
      total: 0,
      totalPage: 0,
      sending: false,
      loginTipVisible: false,
      loginTipTimer: null
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: 'routeChange'
  },
  created() {
    // 生命周期函数
  },
  async mounted() {
    // 页面加载完成后
    await this.routeChange()
  },
  beforeDestroy() {
    this.loginTipTimer && clearTimeout(this.loginTipTimer)
  },
  methods: {
    // 事件处理器
    initDate,
    ...mapActions('user', ['login']),
    // 选择表情包
    choseEmoji(inner) {
      this.textarea += '[' + inner + ']'
    },
    analyzeEmoji(value) {
      return Marked(analyzeEmoji(xss(value)))
    },
    // 发送留言
    async sendMsg() {
      if (this.sending) return
      if (!this.haslogin) {
        this.showLoginTip()
        return
      }
      if (this.textarea && this.textarea.trim()) {
        const content = xss(this.textarea.trim())
        this.sending = true
        this.sendTip = '发送中...'
        try {
          const res = await commentAPI.add({
            content,
            articleId: String(this.id),
            parentId: this.isRespond ? String(this.pid) : ''
          })
          if (res.code === 0) {
            this.textarea = ''
            this.appendComment(res.data || this.createFallbackComment(content))
            this.total = (Number(this.total) || 0) + 1
            this.removeRespond()
            Message({
              message: '评论已发布',
              type: 'success',
              duration: 2000
            })
          }
        } catch (error) {
          Message({
            message: '评论发送失败，请稍后再试',
            type: 'error',
            duration: 5 * 1000
          })
        } finally {
          this.sending = false
          this.sendTip = '发送~'
        }
      } else {
        Message({
          message: '内容不能为空',
          type: 'error',
          duration: 5 * 1000
        })
        this.sendTip = '内容不能为空~'
        const timer = setTimeout(() => {
          this.sendTip = '发送~'
          clearTimeout(timer)
        }, 3000)
      }
    },
    showLoginTip() {
      this.loginTipVisible = true
      this.loginTipTimer && clearTimeout(this.loginTipTimer)
      this.loginTipTimer = setTimeout(() => {
        this.loginTipVisible = false
      }, 8000)
    },
    closeLoginTip() {
      this.loginTipVisible = false
      this.loginTipTimer && clearTimeout(this.loginTipTimer)
    },
    goLogin() {
      localStorage.setItem('logUrl', this.$route.fullPath)
      this.login()
    },
    async respondMsg(event, { leaveIndex, pIndex, ppIndex, pid }) {
      // 回复留言
      if (!this.isRespond) {
        this.isRespond = true
        var dom = event.currentTarget
        dom = dom.parentNode
        dom.appendChild(this.$refs.respondBox)
        this.leaveIndex = leaveIndex
        this.pIndex = pIndex
        this.ppIndex = ppIndex
        this.pid = pid
      }
    },
    removeRespond() {
      // 取消回复留言
      this.pIndex = -1
      this.ppIndex = -1
      this.isRespond = false
      if (this.$refs.tmsgBox && this.$refs.respondBox && this.$refs.listDom) {
        this.$refs.tmsgBox.insertBefore(this.$refs.respondBox, this.$refs.listDom)
      }
    },
    createFallbackComment(content) {
      return {
        _id: String(Date.now()),
        avatar: '',
        username: '游客',
        label: '',
        createDate: new Date().toISOString(),
        content,
        children: []
      }
    },
    appendComment(comment) {
      try {
        if (this.isRespond) {
          const parent = this.list[this.leaveIndex]
          if (!parent) {
            this.getList(true)
            return
          }
          if (this.pIndex !== -1) {
            const child = parent.children && parent.children[this.pIndex]
            if (!child) {
              this.getList(true)
              return
            }
            const children = child.children || []
            children.push(comment)
            this.$set(child, 'children', children)
          } else {
            const children = parent.children || []
            children.push(comment)
            this.$set(parent, 'children', children)
          }
        } else {
          this.list.unshift(comment)
        }
      } catch (error) {
        console.error(error)
        this.getList(true)
      }
    },
    async getList(initData) {
      const options = {
        keywords: this.keywords,
        pageSize: this.pageSize,
        currentPage: this.current,
        articleId: this.id,
        state: 1
      }

      try {
        const res = await commentAPI.getList(options)
        const { list = [], pagination = {} } = res
        this.list = initData ? list : this.list.concat(list)
        this.total = pagination.countTotal || this.list.length
        this.totalPage = pagination.totalPage || 0
        this.current = pagination.currentPage || this.current
        this.hasMore = (pagination.totalPage || 0) > (pagination.currentPage || this.current)
      } catch (error) {
        if (initData) {
          this.list = []
          this.total = 0
          this.totalPage = 0
          this.hasMore = false
        }
      } finally {
        this.listLoading = false
      }
    },
    addMoreFun() {
      // 查看更多
      if (!this.hasMore) {
        Message({
          message: '没有更多了～～',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      ++this.current
      this.getList(false)
    },
    async routeChange() {
      // 重新加载
      // console.log('重新加载')
      this.current = 1
      await this.getList(true)
    }
  }
}
</script>

<style lang="less" scoped>
.tmsgBox {
  position: relative;
  background: transparent;
  padding: 24px 0 4px;
  margin-bottom: 20px;
  border-radius: 0;
}
.tmsg-respond h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #111827;
}
.tmsg-respond h3 small {
  font-size: smaller;
  cursor: pointer;
}
.comment-auth-tip {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 0 0 14px;
  padding: 14px 16px;
  border: 1px solid rgba(64, 184, 197, 0.2);
  border-radius: 8px;
  background: linear-gradient(135deg, #f7fcfd 0%, #fff9fb 100%);
  box-shadow: 0 16px 34px rgba(15, 23, 42, 0.08);
}
.comment-auth-icon {
  flex: 0 0 38px;
  width: 38px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  color: #fff;
  border-radius: 50%;
  background: #111827;
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.16);
}
.comment-auth-copy {
  flex: 1 1 auto;
  min-width: 0;
}
.comment-auth-copy strong {
  display: block;
  margin-bottom: 4px;
  color: #111827;
  font-size: 15px;
}
.comment-auth-copy span {
  display: block;
  color: #64748b;
  font-size: 13px;
  line-height: 1.6;
}
.comment-auth-actions {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 8px;
}
.comment-auth-tip button {
  height: 34px;
  padding: 0 14px;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}
.comment-auth-primary {
  color: #fff;
  background: #40b8c5;
}
.comment-auth-primary:hover {
  background: #267c89;
}
.comment-auth-ghost {
  color: #64748b;
  background: transparent;
}
.comment-auth-ghost:hover {
  color: #111827;
  background: rgba(15, 23, 42, 0.06);
}
.comment-auth-fade-enter-active,
.comment-auth-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.comment-auth-fade-enter,
.comment-auth-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
.tmsg-respond textarea {
  background: #f8fafc;
  height: 100px;
  margin-bottom: 10px;
}
.OwO {
  position: relative;
  z-index: 1;
}
.OwO .OwO-logo {
  position: relative;
  border-radius: 999px;
  color: #334155;
  display: inline-block;
  background: #fff;
  border: 1px solid #e2e8f0;
  font-size: 13px;
  padding: 0 10px;
  cursor: pointer;
  height: 30px;
  box-sizing: border-box;
  z-index: 2;
  line-height: 30px;
}
.OwO .OwO-logo:hover {
  animation: a 5s infinite ease-in-out;
  -webkit-animation: a 5s infinite ease-in-out;
}
.OwO .OwO-body {
  position: absolute;
  background: #fff;
  border: 1px solid #e2e8f0;
  z-index: 1;
  top: 29px;
  border-radius: 0 8px 8px 8px;
  display: none;
  box-shadow: 0 16px 34px rgba(15, 23, 42, 0.08);
}
.OwO-open .OwO-body {
  display: block;
}
.OwO-open .OwO-logo {
  border-radius: 4px 4px 0 0;
  border-bottom: none;
}
.OwO-open .OwO-logo:hover {
  animation: none;
  -webkit-animation: none;
}
.OwO .OwO-items {
  max-height: 197px;
  overflow: scroll;
  font-size: 0;
  padding: 10px;
  z-index: 1;
}
.OwO .OwO-items .OwO-item {
  background: #f8fafc;
  padding: 5px 10px;
  border-radius: 8px;
  display: inline-block;
  margin: 0 10px 12px 0;
  transition: 0.3s;
  line-height: 19px;
  font-size: 20px;
  cursor: pointer;
}
.OwO .OwO-items .OwO-item:hover {
  background: #eefbfc;
  box-shadow: none;
  animation: a 5s infinite ease-in-out;
  -webkit-animation: a 5s infinite ease-in-out;
}
.OwO .OwO-body .OwO-bar {
  width: 100%;
  height: 30px;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
  border-radius: 0 0 4px 4px;
  color: #334155;
}
.OwO .OwO-body .OwO-bar .OwO-packages li {
  display: inline-block;
  line-height: 30px;
  font-size: 14px;
  padding: 0 10px;
  cursor: pointer;
  margin-right: 3px;
  text-align: center;
}
.OwO .OwO-body .OwO-bar .OwO-packages li:first-of-type {
  border-radius: 0 0 0 3px;
}
@-webkit-keyframes a {
  2% {
    -webkit-transform: translateY(1.5px) rotate(1.5deg);
    transform: translateY(1.5px) rotate(1.5deg);
  }
  4% {
    -webkit-transform: translateY(-1.5px) rotate(-0.5deg);
    transform: translateY(-1.5px) rotate(-0.5deg);
  }
  6% {
    -webkit-transform: translateY(1.5px) rotate(-1.5deg);
    transform: translateY(1.5px) rotate(-1.5deg);
  }
  8% {
    -webkit-transform: translateY(-1.5px) rotate(-1.5deg);
    transform: translateY(-1.5px) rotate(-1.5deg);
  }
  10% {
    -webkit-transform: translateY(2.5px) rotate(1.5deg);
    transform: translateY(2.5px) rotate(1.5deg);
  }
  12% {
    -webkit-transform: translateY(-0.5px) rotate(1.5deg);
    transform: translateY(-0.5px) rotate(1.5deg);
  }
  14% {
    -webkit-transform: translateY(-1.5px) rotate(1.5deg);
    transform: translateY(-1.5px) rotate(1.5deg);
  }
  16% {
    -webkit-transform: translateY(-0.5px) rotate(-1.5deg);
    transform: translateY(-0.5px) rotate(-1.5deg);
  }
  18% {
    -webkit-transform: translateY(0.5px) rotate(-1.5deg);
    transform: translateY(0.5px) rotate(-1.5deg);
  }
  20% {
    -webkit-transform: translateY(-1.5px) rotate(2.5deg);
    transform: translateY(-1.5px) rotate(2.5deg);
  }
  22% {
    -webkit-transform: translateY(0.5px) rotate(-1.5deg);
    transform: translateY(0.5px) rotate(-1.5deg);
  }
  24% {
    -webkit-transform: translateY(1.5px) rotate(1.5deg);
    transform: translateY(1.5px) rotate(1.5deg);
  }
  26% {
    -webkit-transform: translateY(0.5px) rotate(0.5deg);
    transform: translateY(0.5px) rotate(0.5deg);
  }
  28% {
    -webkit-transform: translateY(0.5px) rotate(1.5deg);
    transform: translateY(0.5px) rotate(1.5deg);
  }
  30% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  32%,
  34% {
    -webkit-transform: translateY(1.5px) rotate(-0.5deg);
    transform: translateY(1.5px) rotate(-0.5deg);
  }
  36% {
    -webkit-transform: translateY(-1.5px) rotate(2.5deg);
    transform: translateY(-1.5px) rotate(2.5deg);
  }
  38% {
    -webkit-transform: translateY(1.5px) rotate(-1.5deg);
    transform: translateY(1.5px) rotate(-1.5deg);
  }
  40% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  42% {
    -webkit-transform: translateY(2.5px) rotate(-1.5deg);
    transform: translateY(2.5px) rotate(-1.5deg);
  }
  44% {
    -webkit-transform: translateY(1.5px) rotate(0.5deg);
    transform: translateY(1.5px) rotate(0.5deg);
  }
  46% {
    -webkit-transform: translateY(-1.5px) rotate(2.5deg);
    transform: translateY(-1.5px) rotate(2.5deg);
  }
  48% {
    -webkit-transform: translateY(-0.5px) rotate(0.5deg);
    transform: translateY(-0.5px) rotate(0.5deg);
  }
  50% {
    -webkit-transform: translateY(0.5px) rotate(0.5deg);
    transform: translateY(0.5px) rotate(0.5deg);
  }
  52% {
    -webkit-transform: translateY(2.5px) rotate(2.5deg);
    transform: translateY(2.5px) rotate(2.5deg);
  }
  54% {
    -webkit-transform: translateY(-1.5px) rotate(1.5deg);
    transform: translateY(-1.5px) rotate(1.5deg);
  }
  56% {
    -webkit-transform: translateY(2.5px) rotate(2.5deg);
    transform: translateY(2.5px) rotate(2.5deg);
  }
  58% {
    -webkit-transform: translateY(0.5px) rotate(2.5deg);
    transform: translateY(0.5px) rotate(2.5deg);
  }
  60% {
    -webkit-transform: translateY(2.5px) rotate(2.5deg);
    transform: translateY(2.5px) rotate(2.5deg);
  }
  62% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  64% {
    -webkit-transform: translateY(-0.5px) rotate(1.5deg);
    transform: translateY(-0.5px) rotate(1.5deg);
  }
  66% {
    -webkit-transform: translateY(1.5px) rotate(-0.5deg);
    transform: translateY(1.5px) rotate(-0.5deg);
  }
  68% {
    -webkit-transform: translateY(-1.5px) rotate(-0.5deg);
    transform: translateY(-1.5px) rotate(-0.5deg);
  }
  70% {
    -webkit-transform: translateY(1.5px) rotate(0.5deg);
    transform: translateY(1.5px) rotate(0.5deg);
  }
  72% {
    -webkit-transform: translateY(2.5px) rotate(1.5deg);
    transform: translateY(2.5px) rotate(1.5deg);
  }
  74% {
    -webkit-transform: translateY(-0.5px) rotate(0.5deg);
    transform: translateY(-0.5px) rotate(0.5deg);
  }
  76% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  78% {
    -webkit-transform: translateY(-0.5px) rotate(1.5deg);
    transform: translateY(-0.5px) rotate(1.5deg);
  }
  80% {
    -webkit-transform: translateY(1.5px) rotate(1.5deg);
    transform: translateY(1.5px) rotate(1.5deg);
  }
  82% {
    -webkit-transform: translateY(-0.5px) rotate(0.5deg);
    transform: translateY(-0.5px) rotate(0.5deg);
  }
  84% {
    -webkit-transform: translateY(1.5px) rotate(2.5deg);
    transform: translateY(1.5px) rotate(2.5deg);
  }
  86% {
    -webkit-transform: translateY(-1.5px) rotate(-1.5deg);
    transform: translateY(-1.5px) rotate(-1.5deg);
  }
  88% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  90% {
    -webkit-transform: translateY(2.5px) rotate(-0.5deg);
    transform: translateY(2.5px) rotate(-0.5deg);
  }
  92% {
    -webkit-transform: translateY(0.5px) rotate(-0.5deg);
    transform: translateY(0.5px) rotate(-0.5deg);
  }
  94% {
    -webkit-transform: translateY(2.5px) rotate(0.5deg);
    transform: translateY(2.5px) rotate(0.5deg);
  }
  96% {
    -webkit-transform: translateY(-0.5px) rotate(1.5deg);
    transform: translateY(-0.5px) rotate(1.5deg);
  }
  98% {
    -webkit-transform: translateY(-1.5px) rotate(-0.5deg);
    transform: translateY(-1.5px) rotate(-0.5deg);
  }
  0%,
  to {
    -webkit-transform: translate(0) rotate(0deg);
    transform: translate(0) rotate(0deg);
  }
}
@keyframes a {
  2% {
    -webkit-transform: translateY(1.5px) rotate(1.5deg);
    transform: translateY(1.5px) rotate(1.5deg);
  }
  4% {
    -webkit-transform: translateY(-1.5px) rotate(-0.5deg);
    transform: translateY(-1.5px) rotate(-0.5deg);
  }
  6% {
    -webkit-transform: translateY(1.5px) rotate(-1.5deg);
    transform: translateY(1.5px) rotate(-1.5deg);
  }
  8% {
    -webkit-transform: translateY(-1.5px) rotate(-1.5deg);
    transform: translateY(-1.5px) rotate(-1.5deg);
  }
  10% {
    -webkit-transform: translateY(2.5px) rotate(1.5deg);
    transform: translateY(2.5px) rotate(1.5deg);
  }
  12% {
    -webkit-transform: translateY(-0.5px) rotate(1.5deg);
    transform: translateY(-0.5px) rotate(1.5deg);
  }
  14% {
    -webkit-transform: translateY(-1.5px) rotate(1.5deg);
    transform: translateY(-1.5px) rotate(1.5deg);
  }
  16% {
    -webkit-transform: translateY(-0.5px) rotate(-1.5deg);
    transform: translateY(-0.5px) rotate(-1.5deg);
  }
  18% {
    -webkit-transform: translateY(0.5px) rotate(-1.5deg);
    transform: translateY(0.5px) rotate(-1.5deg);
  }
  20% {
    -webkit-transform: translateY(-1.5px) rotate(2.5deg);
    transform: translateY(-1.5px) rotate(2.5deg);
  }
  22% {
    -webkit-transform: translateY(0.5px) rotate(-1.5deg);
    transform: translateY(0.5px) rotate(-1.5deg);
  }
  24% {
    -webkit-transform: translateY(1.5px) rotate(1.5deg);
    transform: translateY(1.5px) rotate(1.5deg);
  }
  26% {
    -webkit-transform: translateY(0.5px) rotate(0.5deg);
    transform: translateY(0.5px) rotate(0.5deg);
  }
  28% {
    -webkit-transform: translateY(0.5px) rotate(1.5deg);
    transform: translateY(0.5px) rotate(1.5deg);
  }
  30% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  32%,
  34% {
    -webkit-transform: translateY(1.5px) rotate(-0.5deg);
    transform: translateY(1.5px) rotate(-0.5deg);
  }
  36% {
    -webkit-transform: translateY(-1.5px) rotate(2.5deg);
    transform: translateY(-1.5px) rotate(2.5deg);
  }
  38% {
    -webkit-transform: translateY(1.5px) rotate(-1.5deg);
    transform: translateY(1.5px) rotate(-1.5deg);
  }
  40% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  42% {
    -webkit-transform: translateY(2.5px) rotate(-1.5deg);
    transform: translateY(2.5px) rotate(-1.5deg);
  }
  44% {
    -webkit-transform: translateY(1.5px) rotate(0.5deg);
    transform: translateY(1.5px) rotate(0.5deg);
  }
  46% {
    -webkit-transform: translateY(-1.5px) rotate(2.5deg);
    transform: translateY(-1.5px) rotate(2.5deg);
  }
  48% {
    -webkit-transform: translateY(-0.5px) rotate(0.5deg);
    transform: translateY(-0.5px) rotate(0.5deg);
  }
  50% {
    -webkit-transform: translateY(0.5px) rotate(0.5deg);
    transform: translateY(0.5px) rotate(0.5deg);
  }
  52% {
    -webkit-transform: translateY(2.5px) rotate(2.5deg);
    transform: translateY(2.5px) rotate(2.5deg);
  }
  54% {
    -webkit-transform: translateY(-1.5px) rotate(1.5deg);
    transform: translateY(-1.5px) rotate(1.5deg);
  }
  56% {
    -webkit-transform: translateY(2.5px) rotate(2.5deg);
    transform: translateY(2.5px) rotate(2.5deg);
  }
  58% {
    -webkit-transform: translateY(0.5px) rotate(2.5deg);
    transform: translateY(0.5px) rotate(2.5deg);
  }
  60% {
    -webkit-transform: translateY(2.5px) rotate(2.5deg);
    transform: translateY(2.5px) rotate(2.5deg);
  }
  62% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  64% {
    -webkit-transform: translateY(-0.5px) rotate(1.5deg);
    transform: translateY(-0.5px) rotate(1.5deg);
  }
  66% {
    -webkit-transform: translateY(1.5px) rotate(-0.5deg);
    transform: translateY(1.5px) rotate(-0.5deg);
  }
  68% {
    -webkit-transform: translateY(-1.5px) rotate(-0.5deg);
    transform: translateY(-1.5px) rotate(-0.5deg);
  }
  70% {
    -webkit-transform: translateY(1.5px) rotate(0.5deg);
    transform: translateY(1.5px) rotate(0.5deg);
  }
  72% {
    -webkit-transform: translateY(2.5px) rotate(1.5deg);
    transform: translateY(2.5px) rotate(1.5deg);
  }
  74% {
    -webkit-transform: translateY(-0.5px) rotate(0.5deg);
    transform: translateY(-0.5px) rotate(0.5deg);
  }
  76% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  78% {
    -webkit-transform: translateY(-0.5px) rotate(1.5deg);
    transform: translateY(-0.5px) rotate(1.5deg);
  }
  80% {
    -webkit-transform: translateY(1.5px) rotate(1.5deg);
    transform: translateY(1.5px) rotate(1.5deg);
  }
  82% {
    -webkit-transform: translateY(-0.5px) rotate(0.5deg);
    transform: translateY(-0.5px) rotate(0.5deg);
  }
  84% {
    -webkit-transform: translateY(1.5px) rotate(2.5deg);
    transform: translateY(1.5px) rotate(2.5deg);
  }
  86% {
    -webkit-transform: translateY(-1.5px) rotate(-1.5deg);
    transform: translateY(-1.5px) rotate(-1.5deg);
  }
  88% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  90% {
    -webkit-transform: translateY(2.5px) rotate(-0.5deg);
    transform: translateY(2.5px) rotate(-0.5deg);
  }
  92% {
    -webkit-transform: translateY(0.5px) rotate(-0.5deg);
    transform: translateY(0.5px) rotate(-0.5deg);
  }
  94% {
    -webkit-transform: translateY(2.5px) rotate(0.5deg);
    transform: translateY(2.5px) rotate(0.5deg);
  }
  96% {
    -webkit-transform: translateY(-0.5px) rotate(1.5deg);
    transform: translateY(-0.5px) rotate(1.5deg);
  }
  98% {
    -webkit-transform: translateY(-1.5px) rotate(-0.5deg);
    transform: translateY(-1.5px) rotate(-0.5deg);
  }
  0%,
  to {
    -webkit-transform: translate(0) rotate(0deg);
    transform: translate(0) rotate(0deg);
  }
}
/*用户输入表单*/
.tmsg-r-info {
  margin: 10px 0;
}
.tmsg-r-info input {
  height: 30px;
  border-radius: 4px;
  background: #f4f6f7;
}
.tmsg-r-info .info-submit {
  margin: 10px 0;
  text-align: center;
}
.tmsg-r-info .info-submit p,
.tmsg-commentshow h1 {
  /*background: #97dffd;*/
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  /*transition: all .3s ease-in-out;*/
  height: 30px;
  line-height: 30px;
  text-align: center;
}
/*.tmsg-r-info .info-submit p:hover{
    background: #47456d;
}*/
/*评论列表*/
.tmsg-comments .tmsg-comments-tip {
  display: block;
  border-left: 3px solid #40b8c5;
  padding: 2px 12px;
  margin: 38px 0 22px;
  font-size: 18px;
  font-weight: 700;
  color: #111827;
}
.tmsg-commentlist {
  margin-bottom: 20px;
}
.tmsg-commentshow > .tmsg-commentlist {
  border-bottom: 1px solid #e2e8f0;
}
.tmsg-c-item {
  border-top: 1px solid #e2e8f0;
}
.tmsg-c-item article {
  margin: 22px 0;
}
.tmsg-c-item article header {
  margin-bottom: 10px;
}
.tmsg-c-item article header img {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  float: left;
  transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  margin-right: 15px;
  object-fit: cover;
}
.tmsg-c-item article header img:hover {
  transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
}
.tmsg-c-item article header .i-name {
  font-size: 14px;
  margin: 5px 8px 7px 0;
  color: #111827;
  font-weight: bold;
  display: inline-block;
}
.tmsg-c-item article header .i-class {
  display: inline-block;
  margin: 0 4px 4px 0;
  background: #eefbfc;
  color: #267c89;
  border-radius: 999px;
  padding: 3px 6px;
  font-size: 12px;
  font-weight: 400;
}
.tmsg-c-item article header .i-time {
  color: #94a3b8;
  font-size: 12px;
}
.tmsg-c-item article section {
  margin-left: 67px;
  word-wrap: break-word;
  word-break: normal;
}
// .tmsg-c-item article section p img {
//   vertical-align: middle;
// }
.tmsg-c-item article section .tmsg-replay {
  margin: 10px 0;
  font-size: 12px;
  color: #267c89;
  cursor: pointer;
  font-weight: 600;
}
@media screen and (max-width: 800px) {
  .comment-auth-tip {
    flex-wrap: wrap;
  }
  .comment-auth-actions {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
<style>
.tmsg-c-item article section p {
  line-height: 1.7;
  color: #334155;
}
.tmsg-c-item article section p img {
  vertical-align: middle;
}
</style>
