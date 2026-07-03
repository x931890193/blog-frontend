<template>
  <div class="blocked-page tcommonBox">
    <div class="blocked-status">451</div>
    <h1>访问受限</h1>
    <p>当前网络环境暂时无法访问本站前台内容。</p>
  </div>
</template>

<script>
export default {
  name: 'Blocked'
}
</script>

<style lang="less" scoped>
.blocked-page {
  text-align: center;
  padding: 80px 24px;
  color: #334155;
}
.blocked-status {
  font-size: 72px;
  line-height: 1;
  font-weight: 800;
  color: #e85d75;
}
.blocked-page h1 {
  margin: 18px 0 10px;
  color: #111827;
  font-size: 28px;
}
.blocked-page p {
  margin: 0;
  color: #64748b;
}
</style>
