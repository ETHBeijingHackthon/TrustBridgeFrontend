<script setup>
import { getAvatar, formatAddress, getCoverUri } from '@/utils/common'

defineProps({
  data: {
    type: Object,
    default: () => ({
      reviewer: '',
      score: 0,
      description: '',
      mediaType: '',
      multimedia: ''
    })
  }
})
</script>

<template>
  <div class="comment-card text-[#B9B9B9]">
    <div class="flex justify-between mb-2">
      <div class="flex items-center">
        <a-avatar :size="24">
          <img :src="getAvatar(data.reviewer)" alt="avatar">
        </a-avatar>
        <span class="ml-3">{{ formatAddress(data.reviewer) }}</span>
      </div>
      <a-rate :default-value="data.score / 2" readonly disabled allow-half />
    </div>
    <div class="mb-2">{{ data.description }}</div>
    <div>
      <img :src="getCoverUri(data.multimedia)" alt="media">
    </div>
  </div>
</template>

<style lang="less" scoped>
.comment-card {
  border: 1px solid #525252;
  @apply px-6 py-4 rounded-sm;
}
</style>