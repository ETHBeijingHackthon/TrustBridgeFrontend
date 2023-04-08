<script setup>
import { useAccount } from 'vagmi'
import { useRouter } from 'vue-router'
import Logo from '@/assets/images/logo.svg'
import { Post, ConnectWallet } from '@/components'

const USE_ROUTER = useRouter()
const { isConnected } = useAccount()

const toHome = () => {
  USE_ROUTER.push('/')
}
</script>

<template>
  <div class="flex px-10 py-5 items-center border-b-[1px] border-b-[#4A4A4B]">
    <div class="flex text-lg font-bold items-center cursor-pointer" @click="toHome">
      <div class="bg-primary p-2 rounded">
        <img :src="Logo" class="margin-0" alt="Logo" />
      </div>
      <span class="ml-5">TrustBridge</span>
    </div>
    <Post class="ml-auto mr-4">
      <a-button size="large" v-if="isConnected">
        <template #icon>
          <icon-send :size="20" />
        </template>
        Post
      </a-button>
    </Post>
    <ConnectWallet />
  </div>
</template>

<style scoped></style>