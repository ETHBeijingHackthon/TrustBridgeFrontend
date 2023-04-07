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
      <a-rate v-if="+data.score" :model-value="data.score / 2" disabled allow-half readonly />
    </div>
    <div class="mb-2">{{ data.description }}</div>
    <div v-if="getCoverUri(data.multimedia)">
      <a-image width="200" height="200" fit="cover" :src="getCoverUri(data.multimedia)" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.comment-card {
  border: 1px solid #525252;
  @apply px-6 py-4 rounded;
}
</style>