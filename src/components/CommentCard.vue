<script setup>
defineProps({
  data: {
    type: Object,
    default: () => ({
      postby: '',
      point: 0,
      comment: '',
      media: ''
    })
  }
})
</script>

<template>
  <div class="comment-card text-[#B9B9B9]">
    <div class="flex justify-between mb-2">
      <div class="flex items-center">
        <a-avatar :size="24">
          <img :src="`https://robohash.org/${data.postby}.png?set=set3&size=1200x1200`" alt="avatar">
        </a-avatar>
        <span class="ml-3">{{ data.postby }}</span>
      </div>
      <a-rate :default-value="data.point" readonly disabled />
    </div>
    <div class="mb-2">{{ data.comment }}</div>
    <div>
      media
    </div>
  </div>
</template>

<style lang="less" scoped>
.comment-card {
  border: 1px solid #525252;
  @apply px-6 py-4 rounded-sm;
}
</style>