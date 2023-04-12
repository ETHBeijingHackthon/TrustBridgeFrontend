<script setup>
import { watch } from 'vue'
import { useNetwork, useSwitchNetwork, useConnect } from 'vagmi'
import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
import { notiError } from '@/utils/common'
document.body.setAttribute('arco-theme', 'dark')

const { isConnected } = useConnect()
const { chain } = useNetwork();
const { switchNetwork }
  = useSwitchNetwork({
    chainId: import.meta.env.VITE_CHAIN_ID,
    throwForSwitchChainNotSupported: true,
    onError(error) {
      notiError(error.internal.message)
    }
  });

watch(() => isConnected.value, isConnected => {
  if (isConnected) {
    if (chain.value?.id !== import.meta.env.VITE_CHAIN_ID_DECIMAL) {
      switchNetwork.value()
    }
  }
})
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
