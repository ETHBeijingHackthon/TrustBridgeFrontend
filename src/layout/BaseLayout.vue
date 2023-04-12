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
    <a-layout-footer class="text-center px-8 pt-7 lg:pt-24 pb-4 lg:pb-14 bg-black">
      <div class="mb-4 lg:mb-10 text-xl font-bold">
        Join our WeChat Group & Building with us
      </div>
      <div class="flex lg:block items-center justify-center mb-4 lg:mb-0">
        <a-image :src="QrCode" class="w-[50px] lg:w-[154px] mx-0 lg:mx-auto mb-0 lg:mb-4" />
        <div class="mb-0 lg:mb-4 ml-2 lg:ml-0">
          <a href="https://github.com/ETHBeijingHackthon" target="_blank"><icon-github :size="30" /></a>
          <a :href="`mailto:${email}`" target="_blank" class="ml-2"><icon-google-circle-fill :size="30" /></a>
        </div>
      </div>
      <div class="text-[#999]"><icon-copyright /> {{ new Date().getFullYear() }} TrustBridge Built with ❤. love.</div>
    </a-layout-footer>
    <a-back-top />
  </a-layout>
</template>

<style scoped>
.layout-content {
  background: url('../assets/images/bg.png') no-repeat center top / 100% auto;
}
</style>