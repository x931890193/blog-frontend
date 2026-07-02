<!-- 友情链接模块 -->
<template>
  <div>
    <div class="tFriendsBox tcommonBox">
      <div class="friendslink-title">棒棒哒</div>
      <el-row>
        <el-col
          v-for="(item, index) in friendslink"
          :key="'f' + index"
          :span="12"
          class="tf-item"
        >
          <a :href="item.url" target="_blank">
            <HeadImg :src="item.headerImg" />
            <h4>{{ item.title }}</h4>
            <p>{{ item.description }}</p>
          </a>
        </el-col>
      </el-row>
    </div>
    <Message id="friendslink" />
  </div>
</template>

<script>
import userAPI from '@/api/user'
import Message from '@/components/message'
export default {
  name: 'Friendslink',
  components: {
    Message
  },
  data() {
    // 选项 / 数据
    return {
      friendslink: [] // 友情链接
    }
  },
  async created() {
    // 生命周期函数
    await this.getList()
  },
  methods: {
    // 事件处理器
    async getList() {
      const res = await userAPI.getLinkList()
      this.friendslink = res.rows
    }
  }
}
</script>

<style scoped>
.tFriendsBox {
  margin-bottom: 40px;
}
.tFriendsBox .friendslink-title {
  font-size: 25px;
  font-weight: 700;
  text-align: center;
  padding: 18px 0 30px;
  color: #111827;
}
.tFriendsBox .tf-item {
  transition: all 0.3s ease-out;
  border-radius: 8px;
  position: relative;
}
.tFriendsBox .tf-item:hover {
  background: #f8fafc;
}
.tFriendsBox .tf-item a {
  display: block;
  padding: 0 10px 0 90px;
  height: 90px;
}
.tFriendsBox .tf-item a img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: absolute;
  top: 15px;
  left: 15px;
  cursor: pointer;
  object-fit: cover;
  border: 3px solid #fff;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.1);
}
.tFriendsBox .tf-item a h4 {
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 20px;
  padding-top: 15px;
  font-weight: bold;
  color: #111827;
}
.tFriendsBox .tf-item a p {
  margin: 10px 0;
  font-size: 12px;
  line-height: 24px;
  color: #64748b;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
