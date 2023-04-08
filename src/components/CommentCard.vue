<script setup>
import { ref, nextTick } from 'vue'
import { getAvatar, formatAddress, getCoverUri } from '@/utils/common'

const props = defineProps({
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

const videoRef = ref(null)
const visiblePlayer = ref(false)
const mediaSrc = ref('')

const handlePlay = async () => {
  visiblePlayer.value = true
  mediaSrc.value = getCoverUri(props.data.multimedia)
  await nextTick()
  videoRef.value.load()
  videoRef.value.play()
}

const handleCloseModal = () => {
  videoRef.value.pause()
}
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
      <a-image v-if="data.mediaType == '1'" width="200" height="200" fit="cover" :src="getCoverUri(data.multimedia)" />
      <a-button shape="round" @click="handlePlay" v-else-if="data.mediaType == '2' || data.mediaType == '3'">
        <icon-play-arrow-fill /> <span class="ml-1">Play</span>
      </a-button>
    </div>
  </div>
  <a-modal title="Player" v-model:visible="visiblePlayer" @close="handleCloseModal" :width="520" :footer="false" simple>
    <video ref="videoRef" controls="controls" autoplay="autoplay" class="w-full object-contain">
      <source :src="mediaSrc" type="video/mp4" />
    </video>
  </a-modal>
</template>

<style lang="less" scoped>
.comment-card {
  border: 1px solid #525252;
  @apply px-6 py-4 rounded;
}
</style>