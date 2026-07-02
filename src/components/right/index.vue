<template>
  <div class="rightlistBox">
    <section>
      <div class="r1-head">
        <img src="@/assets/img/headtou02.jpg" alt>
        <h1>
          <span>Byte</span>Alien
        </h1>
      </div>
      <div class="r1-body">
        <p>后端开发工程师，长期记录技术、产品和个人项目。</p>
        <div class="catch-me">
          <div>
            <el-tooltip class="item" content="Github" placement="top">
              <a :href="catchMeObj.git || 'https://github.com/x931890193'" target="_blank" rel="noopener noreferrer">
                <i class="fa fa-fw fa-github" />
              </a>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="简历" placement="top">
              <a href="http://resume.mongona.com/" target="_blank">
                <i class="fa fa-fw fa-file-word-o" />
              </a>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="更多" placement="top">
              <a href="#/aboutme" @click.prevent="goAbout">
                <i class="el-icon-more" />
              </a>
            </el-tooltip>
          </div>
        </div>
      </div>
    </section>
    <section class="rs2" @click="lovemeFun">
      <p>喜欢这个站点？</p>
      <div class="like-count">
        <i :class="loveme ? 'fa fa-heart active' : 'fa fa-heart-o'" />
        <span>{{ likeNum }}</span>
      </div>
    </section>
    <section />
    <section class="rs3">
      <h2 class="ui label">最新评论</h2>
      <ul class="rs3-textwidget">
        <li v-for="(item, index) in artCommentList" :key="'artCommentList' + index" class="rs3-item">
          <a
            href="javascript:void(0);"
            @click="item.isArticle ? goDetail(item.articleId): goOther(item.title)"
          >
            <div class="rs3-photo">
              <HeadImg :src="item.avatar" />
            </div>
            <div class="rs3-inner">
              <p class="rs3-author">{{ item.username }} 在「{{ item.title }}」中说:</p>
              <p class="rs3-text" v-html="analyzeEmoji(item.content)">{{ item.content }}</p>
            </div>
          </a>
        </li>
      </ul>
    </section>
    <section class="rs4">
      <h2 class="ui label">热门文章</h2>
      <ul>
        <li v-for="(item, index) in browseList" :key="'browseList' + index">
          <a @click="gotoDetail(item.articleId)">
            {{ item.title }}
          </a>
          —— {{ item.count }} 次围观
        </li>
      </ul>
    </section>
    <button v-show="gotoTop" class="toTop" type="button" aria-label="返回顶部" @click="toTopfun">
      <i class="el-icon-arrow-up" />
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import commentAPI from '@/api/comment'
import loveAPI from '@/api/love'
import aboutApi from '@/api/siteinfo'
import {analyzeEmoji, throttle} from '@/utils'
import xss from 'xss'

const SITE_LOVED_KEY = 'bytealien-site-loved'

export default {
  name: 'Right',
  data() {
    return {
      loveme: false,
      gotoTop: false, // 返回顶部
      going: false, // 是否正在执行上滑动作
      browseList: [], // 浏览量最多
      artCommentList: [], // 评论量最多
      likeNum: 0, // 点赞量
      initLikeNum: 0, // 初始化喜欢数量
      catchMeObj: {
        git: '',
        // wechat: require('./../../assets/img/aimee/erwm.jpg'),
        job: ''
      }
    }
  },
  async created() {
    this.loveme = window.localStorage.getItem(SITE_LOVED_KEY) === '1'
    this.init()
    await this.getTopComment()
    await this.getAbout()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', throttle)
  },
  methods: {
    ...mapActions('common', ['goDetail']),
    init() {
      window.addEventListener(
        'scroll',
        throttle(() => {
          var t = document.documentElement.scrollTop || document.body.scrollTop
          if (!this.going) {
            this.gotoTop = t > 600
          }
        }, 80)
      )
    },
    gotoDetail(id) {
      if (this.$route.params.id !== id) {
        this.goDetail(id)
      }
    },
    toTopfun() {
      this.gotoTop = false
      this.going = true
      var timer = setInterval(() => {
        // 获取滚动条距离顶部高度
        var osTop =
          document.documentElement.scrollTop || document.body.scrollTop
        var ispeed = Math.floor(-osTop / 7)
        document.documentElement.scrollTop = document.body.scrollTop =
          osTop + ispeed
        // 到达顶部，清除定时器
        if (osTop === 0) {
          this.going = false
          clearInterval(timer)
          timer = null
        }
      }, 30)
    },
    goOther(path) {
      this.$router.push('/' + path)
    },
    goAbout() {
      if (this.$route.name !== 'Aboutme') {
        this.$router.push({ name: 'Aboutme' })
      }
    },
    analyzeEmoji(value) {
      return analyzeEmoji(xss(value))
    },
    async getTopComment() {
      const res = await commentAPI.getTopComment()
      this.artCommentList = res.topCommentList
      this.browseList = res.browseList
      if (res.loveCount) {
        this.likeNum = res.loveCount
      }
    },
    async lovemeFun() {
      if (this.loveme) {
        this.$message({ message: '已点赞过哦', duration: 3000 })
        return
      }
      try {
        const res = await loveAPI.add()
        if (res.status === 1) {
          const loveCount = parseInt(res.loveCount, 10)
          this.likeNum = Number.isNaN(loveCount) ? String((parseInt(this.likeNum, 10) || 0) + 1) : String(loveCount)
          this.loveme = true
          window.localStorage.setItem(SITE_LOVED_KEY, '1')
        }
      } catch (error) {
        this.$message({ message: '点赞失败，请稍后再试', type: 'error', duration: 3000 })
      }
    },
    async getAbout() {
      const res = await aboutApi.getAbout()
      this.catchMeObj = res.catchMe
      this.likeNum = res.likeNum
    }
  }
}
</script>

<style lang="less">
.rightlistBox {
  position: relative;
}
.rightlistBox section {
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  position: relative;
  background: #fff;
  padding: 18px;
  margin-bottom: 18px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 8px;
  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.045);
}
.rightlistBox section:empty {
  display: none;
}
.rightlistBox section:hover {
  transform: translateY(-2px);
  border-color: rgba(64, 184, 197, 0.26);
  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.07);
}
.rightlistBox .r1-head {
  text-align: center;
  border-radius: 8px 8px 0 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  /*box-shadow: inset 0 -70px 100px -50px rgba(0,0,0,.5);*/
}
.rightlistBox .r1-head img {
  width: 100%;
  height: 132px;
  min-height: 132px;
  object-fit: cover;
  border-radius: 6px;
}
.rightlistBox .r1-head h1 {
  position: absolute;
  bottom: 12px;
  margin: 0 0 0 -65px;
  font-size: 19px;
  letter-spacing: 0.5px;
  color: #fff;
  text-shadow: 0 8px 20px rgba(15, 23, 42, 0.58);
  font-weight: 700;
  width: 130px;
  left: 50%;
}
.rightlistBox .r1-head h1 span {
  opacity: 0.72;
}
.rightlistBox .r1-body p {
  font-size: 14px;
  margin: 14px 0 12px 0;
  font-weight: 600;
  text-align: center;
  color: #334155;
}
.rightlistBox .r1-body .catch-me {
  text-align: center;
}
.rightlistBox .r1-body .catch-me a {
  display: inline-block;
  margin-bottom: 4px;
  position: relative;
  text-decoration: none;
}
.rightlistBox .r1-body .catch-me a:hover i {
  color: #fff;
  background: #40b8c5;
  transform: translateY(-2px);
}
.rightlistBox .r1-body .catch-me a i {
  display: inline-block;
  font-size: 18px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 999px;
  color: #475569;
  background: #f1f5f9;
  transition: all 0.3s ease-in-out;
  font-style: normal;
  margin: 0 4px;
}

/*************do you like me*******************/
.rightlistBox .rs2 {
  min-height: auto;
  cursor: pointer;
  background: linear-gradient(135deg, #f7fcfd 0%, #fff5f7 100%);
  border-color: rgba(64, 184, 197, 0.2);
}
.rightlistBox .rs2 p {
  color: #334155;
  font-size: 14px;
  margin: 0 0 12px;
  text-align: left;
  font-weight: 600;
}
.rightlistBox .rs2 .like-count {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #e85d75;
  font-size: 28px;
  font-weight: 800;
}
.rightlistBox .rs2 .like-count i {
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 999px;
  color: #fff;
  background: #e85d75;
  box-shadow: 0 10px 20px rgba(232, 93, 117, 0.18);
  transition: transform 0.2s ease, background 0.2s ease;
}
.rightlistBox .rs2:hover .like-count i,
.rightlistBox .rs2 .like-count i.active {
  transform: scale(1.06);
  background: #d94665;
}
/**********排队来说*************/
.rightlistBox .rs3 .rs3-item {
  font-size: 13px;
  line-height: 1.55;
}
.rightlistBox .rs3 .rs3-item a {
  display: block;
  padding: 10px 0;
  transition: all 0.3s ease-out;
  border-bottom: 1px solid #e2e8f0;
  margin: 0;
}
.rightlistBox .rs3 .rs3-item a:hover {
  color: #267c89;
}
.rightlistBox .rs3 .rs3-photo {
  float: left;
}
.rightlistBox .rs3 .rs3-photo img {
  border-radius: 50%;
  width: 32px;
  height: 32px;
  object-fit: cover;
}
.rightlistBox .rs3 .rs3-inner {
  margin-left: 40px;
}
.rightlistBox .rs3 .rs3-inner .rs3-author {
  font-weight: 700;
  color: #334155;
}
.rightlistBox .rs3 .rs3-inner .rs3-text {
  font-size: 12px;
  text-align: justify;
  overflow-wrap: break-word;
  color: #64748b;
  margin-top: 3px;
}
.rightlistBox .rs3 .rs3-item:last-child a {
  border-bottom: none;
}
/************排队看这些***************/
.rightlistBox .rs4 li {
  padding: 10px 0;
  text-align: justify;
  line-height: 1.5;
  color: #64748b;
  border-bottom: 1px solid #e2e8f0;
}
.rightlistBox .rs4 li:last-child {
  border-bottom: none;
}
.rightlistBox .rs4 li a {
  font-weight: 600;
  color: #334155;
}
.rightlistBox .rs4 li a:hover {
  color: #267c89;
}

/*回到顶部*/
/*返回到顶部*/
.toTop {
  position: fixed;
  right: 28px;
  bottom: 28px;
  z-index: 99;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(64, 184, 197, 0.28);
  border-radius: 999px;
  color: #267c89;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.14);
  transition: all 0.2s ease;
  cursor: pointer;
}
.toTop:hover {
  color: #fff;
  background: #40b8c5;
  transform: translateY(-2px);
}

@keyframes toflow {
  0% {
    /*top:400px;*/
    transform: scale(0.95) translate(0, 10px);
  }
  50% {
    /*top:410px;*/
    transform: scale(1) translate(0, 0px);
  }
  100% {
    /*top:400px;*/
    transform: scale(0.95) translate(0, 10px);
  }
}
</style>
