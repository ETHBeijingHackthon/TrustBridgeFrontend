<script setup>
import { Header } from '@/components'
import QrCode from '@/assets/images/qrcode.jpg'

const email = 'stoneprotocol@gmail.com'
</script>

<template>
  <a-layout class="min-h-[100vh]">
    <a-layout-header>
      <Header />
    </a-layout-header>
    <a-layout-content class="layout-content px-4 lg:px-10 pb-6 lg:pb-24">
      <router-view />
    </a-layout-content>
    <a-layout-footer class="text-center px-8 pt-7 lg:pt-24 pb-7 lg:pb-14 bg-black">
      <div class="mb-4 lg:mb-10 text-xl font-bold">
        Join our WeChat Group & Building with us
      </div>
      <div class="flex lg:block items-center">
        <a-image :src="QrCode" class="w-[60px] lg:w-[174px] mx-auto mb-0 lg:mb-6" />
        <div>
          <div class="text-[#999] mb-1 lg:mb-2">Mail: <a :href="`mailto:${email}`">{{ email }}</a></div>
          <div class="text-[#999]">COPYRIGHT <icon-copyright /> 2023 TrustBridge Built with ❤. love.</div>
        </div>
      </div>
    </a-layout-footer>
    <a-back-top />
  </a-layout>
</template>

<style scoped>
.layout-content {
  background: url('../assets/images/bg.png') no-repeat center top / 100% auto;
}
</style>