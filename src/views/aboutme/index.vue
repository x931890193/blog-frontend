<!-- 关于我 -->
<template>
  <div class="aboutmeBox">
    <div class="tcommonBox">
      <div class="aboutme-title">关于我</div>
      <section class="aboutme-content">
        <p class="">
          <img src="@/assets/img/maoto.png" alt="" class="aboutmeImg"/>
        </p>
        <p v-for="(item) in descriptions" class="aboutme-description">{{ item }} </p>
      </section>
    </div>
    <Message id="aboutme"/>
  </div>
</template>

<script>
import siteApi from '@/api/siteinfo'
import Message from './../../components/message/index'

export default {
  components: {
    // 定义组件
    Message
  },
  data() {
    return {
      descriptions: [
        '博客2021年9月16日更新2.0'
      ]
    }
  },
  created() {
    // 生命周期函数
    this.getAbout()
  },
  methods: {
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
