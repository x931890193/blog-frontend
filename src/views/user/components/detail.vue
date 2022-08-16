<template>
  <div class="tcommonBox">
    <header>
      <h1 style="text-align: center">
        个人中心
        <button class="gotoEdit" @click="gotoEdit">
          <i class="fa fa-wa fa-edit" />编辑
        </button>
      </h1>
    </header>
    <br>
    <section>
      <ul class="userInfoBox">
        <li class="avatarlist">
          <span class="leftTitle">头像:</span>
          <div class="avatar-uploader">
            <HeadImg :src="userInfo.avatar" class="avatar" />
          </div>
        </li>
        <li class="username">
          <span class="leftTitle">昵称:</span>
          <span>{{ userInfo.username || '无' }}</span>
        </li>
        <li>
          <span class="leftTitle">个性标签:</span>
          <span>{{ userTag[userInfo.label] || '未设置' }}</span>
        </li>
        <li>
          <span class="leftTitle">接收更新邮件:</span>
          <span>{{ userInfo.receiveUpdate ? '是' : '否' }}</span>
        </li>
        <li>
          <span class="leftTitle">友链状态:</span>
          <span>{{ userInfo.state && userInfo.verifyStatus ?userInfo.verifyStatus : '无' }}</span>
        </li>
        <li>
          <span class="leftTitle">是否展示友链:</span>
          <span>{{ userInfo.state ? '是' : '否' }}</span>
        </li>
        <li>
          <span class="leftTitle">网站名称:</span>
          <span>{{ userInfo.linkname || '无' }}</span>
        </li>
        <li>
          <span class="leftTitle">网站地址:</span>
          <p class="rightInner">{{ userInfo.linkUrl || '无' }}</p>
        </li>
        <li>
          <span class="leftTitle">网站简介:</span>
          <p class="rightInner">{{ userInfo.linkDesc || '无' }}</p>
        </li>
        <li class="avatarlist">
          <span class="leftTitle">网站logo:</span>
          <div class="avatar-uploader">
            <HeadImg :src="userInfo.logoUrl" class="avatar" />
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { userTag } from '@/utils/constants'

export default {
  name: 'Detail',
  components: {},
  props: ['userInfo'],
  data() {
    return {
      userTag: userTag
    }
  },
  created() {},
  methods: {
    gotoEdit() {
      this.$emit('gotoEdit')
    }
  }
}
</script>

<style scoped></style>
