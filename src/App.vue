<script setup>
document.body.setAttribute('arco-theme', 'dark')
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style lang="less" scoped>
:deep(.arco-btn-secondary:hover,
  .arco-btn-secondary[type='button']:hover,
  .arco-btn-secondary[type='submit']:hover) {
  background-color: #444;
  border-color: #fff;
}
</style>
