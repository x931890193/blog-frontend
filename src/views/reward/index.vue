<!-- 赞赏模块 -->
<template>
  <div class="tRewardBox tcommonBox">
    <div class="reward-title">赞赏</div>
    <div class="reward-description-title">赞赏方式：</div>
    <el-row :gutter="30">
      <el-col :span="12" class="donate-item">
        <div class="donate-tip">
          <img :src="wechatImage" alt="wechat pay">
          <span>微信扫一扫</span>
        </div>
      </el-col>
      <el-col :span="12" class="donate-item">
        <div class="donate-tip">
          <img :src="aliPayImage" alt="alipay">
          <span>支付宝扫一扫</span>
        </div>
      </el-col>
    </el-row>
    <div class="reward-description-title">赞赏记录：</div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="pay_time" label="日期" align="center" />
      <el-table-column prop="name" label="赞赏人" align="center" />
      <el-table-column prop="money" label="金额" align="center" />
    </el-table>
  </div>
</template>

<script>
import rewardAPI from '@/api/reward'

export default {
  name: 'Reward',
  components: {
    // 定义组件
  },
  data() {
    // 选项 / 数据
    return {
      wechatImage: '',
      aliPayImage: '',
      tableData: [
        {
          // 赞赏数据
          pay_time: '2020-05-02',
          name: '若水',
          money: '1.5'
        }
      ]
    }
  },
  async created() {
    // 生命周期函数
    await this.getReward()
  },
  methods: {
    // 事件处理器
    async getReward() {
      const res = await rewardAPI.getRewardList()
      this.wechatImage = res.wechat_image
      this.aliPayImage = res.alipay_image
      this.tableData = res.rewards // [{pay_time: '2020-05-02', name: '若水', money: '1.5'}]
    }
  }
}
</script>

<style scoped lang="less">
.tRewardBox {
  padding-bottom: 40px;
  .reward-description-title {
    font-size: 20px;
    font-weight: 700;
    padding: 10px;
    margin-bottom: 10px;
  }
  .reward-title {
    font-size: 25px;
    font-weight: 700;
    text-align: center;
    padding: 30px 0;
  }
  .reward-content {
    font-size: 15px;
    line-height: 24px;
    padding: 5px 20px;
  }
}

.tRewardBox .donate-item {
  text-align: right;
  color: #44b549;
}
.tRewardBox .donate-item:last-child {
  text-align: left;
  color: #00a0e9;
}
.tRewardBox .donate-item img {
  width: 100%;
  display: block;
  height: auto;
}
.tRewardBox .donate-item div {
  display: inline-block;
  width: 160px;
  padding: 0 6px;
  text-align: center;
  box-sizing: border-box;
}
.tRewardBox .donate-item div span {
  display: inline-block;
  width: 100%;
  margin: 10px 0;
  text-align: center;
}
.tRewardBox .el-table__body-wrapper {
  overflow: hidden;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background: transparent;
}
</style>
