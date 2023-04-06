<script setup>
import { Header } from '@/components'
import Logo from '@/assets/images/logo.svg'
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
        Join the WeChat group and bulid with us
      </div>
      <img width="174" height="174" :src="Logo" alt="qrcode" class="mx-auto" />
      <div class="text-[#999]">Mail: stoneprotocol@gmail.com</div>
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