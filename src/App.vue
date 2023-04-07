<script setup>
import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
document.body.setAttribute('arco-theme', 'dark')
</script>

<template>
  <a-config-provider :locale="enUS">
    <router-view></router-view>
  </a-config-provider>
</template>

<style lang="less" scoped>
:deep(.arco-btn-secondary:hover,
  .arco-btn-secondary[type='button']:hover,
  .arco-btn-secondary[type='submit']:hover) {
  background-color: #444;
  border-color: #fff;
}
</style>
