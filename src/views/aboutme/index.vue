<!-- 关于我 -->
<template>
  <div class="aboutmeBox">
    <div class="tcommonBox">
      <div class="aboutme-title">关于我</div>
      <section class="aboutme-content">
        <div class="aboutme-description" v-html="renderMarkDown(descriptions)"></div>
      </section>
    </div>
    <Message id="aboutme"/>
  </div>
</template>

<script>
import siteApi from '@/api/siteinfo'
import Message from './../../components/message/index'
import Marked from 'marked'
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
  components: {
    // 定义组件
    Message
  },
  data() {
    return {
      descriptions: ''
    }
  },
  created() {
    // 生命周期函数
    this.getAbout()
  },
  methods: {
    renderMarkDown(string) {
      return Marked(string)
    },
    // 事件处理器
    async getAbout() {
      const res = await siteApi.getAbout()
      this.descriptions = res.descriptions
    }
  }
}
</script>

<style scoped lang="less">
.aboutmeBox {
  .aboutme-title {
    font-size: 25px;
    font-weight: 700;
    text-align: center;
    padding: 30px 0;
  }

  .aboutmeImg {
    max-width: 100%;
    /*height:300px;*/
  }

  .aboutme-description {
    font-size: 15px;
    line-height: 25px;
    padding: 10px 30px;
  }
}
</style>
