<!-- 用户中心 -->
<template>
  <div v-if="haslogin">
    <Detail v-show="!isEdit" :userInfo="userInfo" @gotoEdit="gotoEdit" />
    <div v-if="isEdit" class="tcommonBox">
      <header>
        <h1 style="text-align: center">编辑个人资料</h1>
      </header>
      <br>
      <section>
        <ul class="userInfoBox">
          <li class="avatarlist">
            <span class="leftTitle">头像</span>
            <div class="avatar-uploader">
              <HeadImg :src="avatar" class="avatar" />
            </div>
          </li>
          <li class="username">
            <span class="leftTitle">昵称:</span>
            <span>{{ username || '无' }}</span>
          </li>
          <li>
            <span class="leftTitle">接收更新邮件:</span>
            <el-switch
              v-model="receiveUpdate"
              :active-value="true"
              :inactive-value="false"
              on-color="#13ce66"
              off-color="#aaa"
            />
          </li>
          <li>
            <span class="leftTitle">个性标签:</span>
            <template>
              <el-radio-group v-model="label">
                <el-radio
                  v-for="(item, index) in userTag"
                  :key="'userTag' + index"
                  :label="index"
                >{{ item }}</el-radio>
              </el-radio-group>
            </template>
          </li>
          <li>
            <span class="leftTitle">是否展示友链:</span>
            <el-switch
              v-model="state"
              :active-value="true"
              :inactive-value="false"
              on-color="#13ce66"
              off-color="#aaa"
            />
          </li>
          <li v-show="state">
            <span class="leftTitle">网站名称:</span>
            <el-input v-model="linkname" placeholder="网站名称" /><i class="fa fa-wa fa-asterisk" />
          </li>
          <li v-show="state">
            <span class="leftTitle">网站地址:</span>
            <el-input
              v-model="linkUrl"
              placeholder="网站"
              value="userWeb"
            />
            <i v-show="state" class="fa fa-wa fa-asterisk" />
          </li>
          <li v-show="state">
            <span class="leftTitle">网站简介:</span>
            <el-input
              v-model="linkDesc"
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
            /><i v-show="state" class="fa fa-wa fa-asterisk" />
          </li>
          <li v-show="state" class="avatarlist">
            <span class="leftTitle">网站logo:</span>
            <div v-show="logoUrl" style="text-align: center">
              <img :src="logoUrl" :alt="logoUrl">
            </div>
            <!-- 上传图片 -->
            <br>
            <div class="avatar-uploader" @click="selectHandle">
              <div class="el-upload">
                <el-link type="primary">上传图片</el-link>
                <input
                  v-show="false"
                  ref="picker"
                  multiple
                  type="file"
                  accept="image/*"
                  @change="beforeAvatarUpload"
                >
              </div>
              <div class="el-upload__tip">
                点击上传头像，只能上传jpg/png文件，且不超过1mb
              </div>
            </div>
          </li>
        </ul>
        <div class="saveInfobtn">
          <a
            class="tcolors-bg"
            href="javascript:void(0);"
            @click="isEdit = !isEdit"
          >取消</a>
          <a class="tcolors-bg" href="javascript:void(0);" @click="saveInfoFun">保 存</a>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { userTag } from '@/utils/constants'
import Detail from './components/detail.vue'
import resourceAPI from '@/api/resource'
export default {
  name: 'UserInfo',
  components: {
    Detail
  },
  data() {
    // 选项 / 数据
    return {
      isEdit: false,
      state: true, // 是否展示友链开关
      receiveUpdate: true,
      userTag: userTag,
      logoUrl: '',
      linkUrl: '',
      linkname: '',
      label: 0,
      linkDesc: ''
    }
  },
  computed: {
    ...mapState('user', ['username', 'haslogin', 'avatar', 'userInfo'])
  },
  methods: {
    // 事件处理器
    ...mapActions('user', ['edit']),
    selectHandle() {
      this.$refs.picker && this.$refs.picker.click()
    },
    beforeAvatarUpload(e) {
      // 判断头像大小
      const targetFile = e.target.files[0]
      const file = new File([targetFile], targetFile.name.replace(/_/g, '-'), {
        type: targetFile.type
      })
      const isJPG =
        file.type === 'image/png' ||
        file.type === 'image/jpg' ||
        file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 1
      // console.log(file);
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/JPEG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      if (isJPG && isLt2M) {
        this.uploadHandler(file)
      }
    },
    async uploadHandler(file) {
      const params = new FormData()
      params.append('name', file.name)
      params.append('file', file)
      await resourceAPI.uploadFile(params).then((res) => {
        this.logoUrl = res.url
      }).catch(err => {
        this.$message.error(err)
      })
    },
    async saveInfoFun() {
      if (this.state) {
        var pattern =
          /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
        // const pattern = new RegExp('(https?|ftp|file)://[-w+&@#/%=~|?!:,.;]+[-w+&@#/%=~|]')
        // console.log(pattern.test(that.userInfo.url));
        // console.log('this.webBlog', this.editUser)
        if (!this.linkUrl || !pattern.test(this.linkUrl)) {
          // 如果展示友链 网址为必填项
          this.$message.error('请正确填写网址，如http://www.xxx.com')
          return
        }
        if (!this.linkname) {
          // 如果展示友链 网址为必填项
          this.$message.error('请填写网站名称')
          return
        }
        if (!this.linkDesc) {
          // 如果展示友链 网址为必填项
          this.$message.error('请填写网站简介')
          return
        }
      }
      const form = {
        userId: this.userInfo.userId,
        label: this.label,
        state: this.state,
        linkUrl: this.linkUrl,
        linkname: this.linkname,
        linkDesc: this.linkDesc,
        receiveUpdate: this.receiveUpdate,
        logoUrl: this.logoUrl
      }
      this.edit(form).then(resp => {
        this.$message.success(this.state ? '保存成功！' + '等待审核' : '保存成功！')
        this.isEdit = false
      }).catch(err => {
        this.$message.error(err)
      })
    },
    gotoEdit() {
      this.receiveUpdate = this.userInfo.receiveUpdate
      this.state = this.userInfo.state
      this.logoUrl = this.userInfo.logoUrl
      this.linkname = this.userInfo.linkname
      this.linkUrl = this.userInfo.linkUrl
      this.linkDesc = this.userInfo.linkDesc
      this.isEdit = !this.isEdit
    }
  }
}
</script>

<style lang="less">
.userInfoBox .avatarlist {
  position: relative;
}

.avatar-uploader {
  // display: inline-block;
  // vertical-align: top;
}
.avatar-uploader .el-upload {
  // border: 1px dashed #d9d9d9;
  // border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  // width: 120px;
  // height: 120px;
}
.avatar-uploader .el-upload:hover {
  // border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
}
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: block;
  object-fit: cover;
}
.gotoEdit {
  font-size: 15px;
  float: right;
  cursor: pointer;
  color: #999;
}
.gotoEdit:hover {
  color: #333;
}
/*个人设置*/
.userInfoBox .leftTitle {
  display: inline-block;
  width: 100px;
  padding: 10px 0;
}
.userInfoBox .rightInner {
  display: inline-block;
  max-width: calc(100% - 140px);
  vertical-align: top;
}
.userInfoBox li {
  padding: 20px;
  border-bottom: 1px solid #ddd;
}
.userInfoBox li:last-child {
  border-bottom: 1px solid transparent;
}
.userInfoBox .el-input,
.userInfoBox .el-textarea {
  max-width: 300px;
  min-width: 100px;
}

.userInfoBox .el-input__inner {
  border-radius: 4px;
}
.userInfoBox .el-textarea {
  vertical-align: top;
}
.saveInfobtn {
  margin: 20px 0;
  text-align: center;
}
.saveInfobtn a {
  color: #fff;
  padding: 6px 20px;
  margin: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
}
.userInfoBox .fa-asterisk {
  color: #df2050;
}
.avatar-uploader {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.upload-box {
  width: 100%;
}
.upload-table-image {
  width: 100px;
  height: 100px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
