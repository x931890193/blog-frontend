<!-- 首页 -->
<template>
  <span
    :class="[
      'tcolors-bg',
      'abutton',
      size === 'small' ? 'abutton-small' : 'abutton-large'
    ]"
    @click="handle"
  >
    <slot />
    <i v-if="icon" :class="icon" />
  </span>
</template>

<script>
export default {
  name: 'AButton',
  components: {
    // 定义组件
  },
  props: {
    icon: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  data() {
    // 选项 / 数据
    return {}
  },
  created() {
    // 生命周期函数
  },
  methods: {
    // 事件处理器
    handle() {
      this.$emit('click')
    }
  }
}
</script>

<style>
.abutton {
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  padding: 0 14px;
  line-height: 34px;
  height: 34px;
  border-radius: 999px;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
  letter-spacing: 0;
  box-shadow: 0 8px 18px rgba(64, 184, 197, 0.16);
}
.abutton-large {
  display: block;
}
.abutton-small {
  display: inline-block;
}
</style>
