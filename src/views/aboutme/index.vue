<!-- 关于我 -->
<template>
  <div class="aboutmeBox">
    <div class="tcommonBox aboutme-markdown">
      <Content :content="descriptions" />
    </div>
  </div>
</template>

<script>
import siteApi from '@/api/siteinfo'
import Content from '@/components/content'

export default {
  components: {
    Content
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
    async getAbout() {
      try {
        const res = await siteApi.getAbout()
        this.descriptions = res.descriptions || ''
      } catch (error) {
        this.descriptions = ''
      }
    }
  }
}
</script>

<style scoped lang="less">
.aboutmeBox {
  .aboutme-markdown {
    padding: 20px;
  }
}
</style>
