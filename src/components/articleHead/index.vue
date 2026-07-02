<template>
  <!--文章head -->
  <div>
    <span class="s-round-date">
      <span class="month">{{
        showInitDate(item.createDate, 'month') + '月'
      }}</span>
      <span class="day">{{ showInitDate(item.createDate, 'date') }}</span>
    </span>
    <header class="article-head">
      <div class="article-head-title">
        <a @click="goDetail(item._id)">
          {{ item.title }}
        </a>
      </div>
      <div class="article-head-count">
        <i class="fa fa-fw fa-user" />发表于
        <i class="fa fa-fw fa-clock-o" /><span>{{
          showInitDate(item.createDate)
        }}</span>
        • <i class="fa fa-fw fa-eye" />{{ item.browseCount }} 次围观 •
        <i class="fa fa-fw fa-comments" />活捉 {{ item.commentCount }} 条 •
        <span class="rateBox">
          <i class="fa fa-fw fa-heart" />{{
            item.likeCount ? item.likeCount : 0
          }}点赞 • <i class="fa fa-fw fa-star" />{{
            item.collectCount ? item.collectCount : 0
          }}收藏
        </span>
      </div>
      <div v-if="activeCateList.length > 0" class="ui label">
        <a href="javascript:void(0);" @click="goArchive(item.classId)">{{
          filterName(activeCateList, item.classId)
        }}</a>
      </div>
    </header>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { initDate, filterName } from '@/utils/index.js'
export default {
  name: 'ArticleHead',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      markValue: ''
    }
  },
  computed: {
    ...mapState('common', ['activeCateList'])
  },
  created() {
    // 生命周期函数
  },
  methods: {
    // 事件处理器
    filterName,
    showInitDate: initDate,
    ...mapActions('common', ['goDetail']),
    goArchive(classId) {
      this.$router.push({
        name: 'Archive',
        query: {
          classId
        }
      })
    }
  }
}
</script>

<style lang="less">
.article-head {
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
}
.article-head .article-head-title {
  padding: 0 0 10px;
  font-size: 24px;
  font-weight: 700;
  text-align: left;
  line-height: 1.35;
  letter-spacing: 0;
}
.article-head .article-head-title a {
  color: #111827;
  transition: color 0.2s ease;
}
.article-head .article-head-title a:hover {
  color: #267c89;
}
.article-head .article-head-count {
  margin: 0 0 8px;
  line-height: 24px;
  text-align: left;
  color: #64748b;
  font-size: 13px;
  .rateBox {
    display: inline-block;
  }
  i {
    font-size: 14px;
    color: #94a3b8;
  }
}
.article-description {
  text-indent: 2em;
}
.article-img {
  max-height: 300px;
  overflow: hidden;
  text-align: center;
}
</style>
