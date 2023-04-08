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
    <a-layout-content class="layout-content px-10">
      <router-view />
    </a-layout-content>
    <a-layout-footer class="text-center pt-24 pb-14 bg-black">
      <div class="mb-10 text-xl font-bold">
        Join our WeChat Group & Building with us
      </div>
      <a-image width="174" :src="QrCode" class="mb-6" />
      <div class="text-[#999] mb-2">Mail: <a :href="`mailto:${email}`">{{ email }}</a></div>
      <div class="text-[#999]">COPYRIGHT <icon-copyright /> 2023 TrustBridge Built with ❤. love.</div>
    </a-layout-footer>
    <a-back-top />
  </a-layout>
</template>

<style scoped>
.layout-content {
  background: url('../assets/images/bg.png') no-repeat center top / 100% auto;
  @apply pb-24;
}
</style>