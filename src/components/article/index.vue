<!-- 文章列表 -->
<template>
  <el-row class="sharelistBox">
    <el-col v-for="(item, index) in list" :key="'article' + index" :span="24" class="s-item tcommonBox">
      <articleHead :item="item" />
      <div class="article-content-list" @click="goDetail(item._id)">
        <Content :content="item.content" />
      </div>
      <div class="viewdetail">
        <AButton icon="el-icon-d-arrow-right" @click="goDetail(item._id)">阅读全文</AButton>
      </div>
    </el-col>
    <el-col v-if="!list.length && !listLoading" class="article-empty tcommonBox">
      暂时没有文章
    </el-col>
    <el-col v-if="list.length > 0 && listLoading" class="tcommonBox">
      <el-pagination
        class="pagination-list"
        background
        :page-size="pageSize"
        :current-page.sync="current"
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </el-col>
  </el-row>
</template>

<script>
import { mapActions } from 'vuex'
import articleAPI from '@/api/article'
import articleHead from '@/components/articleHead'
import Content from '@/components/content'
import AButton from '@/components/abutton'
export default {
  name: 'Article',
  components: {
    // 定义组件
    articleHead,
    Content,
    AButton
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['type'],
  data() {
    // 选项 / 数据
    return {
      keywords: '',
      hasMore: true,
      list: [],
      pageSize: 10,
      current: 1,
      total: 0,
      totalPage: 0,
      listLoading: true
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    // 'type': 'routeChange',
    $route: 'routeChange'
  },
  async created() {
    // 生命周期函数
    await this.routeChange()
  },

  methods: {
    // 事件处理器
    ...mapActions('common', ['goDetail']),
    async getList() {
      const options = {
        keywords: this.keywords,
        like: this.like,
        collect: this.collect,
        pageSize: this.pageSize,
        currentPage: this.current
      }
      try {
        const res = await articleAPI.getList(options)
        const { list, pagination } = res
        this.list = list
        this.total = pagination.countTotal || pagination.total || 0
        this.totalPage = pagination.totalPage
        this.current = pagination.currentPage
        this.listLoading = pagination.totalPage > pagination.currentPage
      } catch (e) {
        this.list = []
        this.total = 0
        this.totalPage = 0
        this.listLoading = false
      }
      // this.loadingInstance && this.loadingInstance.close()
    },

    async handleCurrentChange(val) {
      this.current = val
      await this.getList()
    },

    async routeChange() {
      // this.loadingInstance = this.$loading({ target: this.$refs.article })
      const { keywords } = this.$route.query
      this.keywords = keywords
      this.like = this.type === 'like' ? 1 : 0
      this.collect = this.type === 'collect' ? 1 : 0
      await this.getList()
    }
  }
}
</script>

<style>
/*文章列表*/
.sharelistBox {
  transition: all 0.5s ease-out;
  font-size: 15px;
  min-height: 0;
}
.pagination-list {
  text-align: center;
  padding: 10px 0 2px;
}
.article-empty {
  color: #64748b;
  font-weight: 600;
  text-align: center;
}
.pagination-list.el-pagination.is-background .el-pager li,
.pagination-list.el-pagination.is-background .btn-next,
.pagination-list.el-pagination.is-background .btn-prev {
  border-radius: 999px;
  background: #f1f5f9;
  color: #475569;
}
.pagination-list.el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #267c89;
}
.pagination-list.el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: #40b8c5;
  color: #ffffff;
}
/* .pagination-list.el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #ffffff;
} */
</style>
<style lang="less" scoped>
.sharelistBox {
  section p {
    line-height: 24px;
    margin: 10px 0;
  }
}
.article-content-list {
  position: relative;
  max-height: 290px;
  overflow: hidden;
  cursor: pointer;
  color: #334155;
  line-height: 1.75;
}
.article-content-list::after {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 64px;
  content: '';
  pointer-events: none;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0), #ffffff 82%);
}
</style>
