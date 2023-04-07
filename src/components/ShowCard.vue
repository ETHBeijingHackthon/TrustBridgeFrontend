<script setup>
import { Category } from '@/components'
import { getAvatar, getCoverUri } from '@/utils/common'

defineProps({
  data: {
    type: Object,
    default: () => ({
      coverUri: '',
      title: '',
      sort: 0,
      title: '',
      rates: [],
      score: 0
    })
  }
})
</script>

<template>
  <div class="show-card rounded cursor-pointer">
    <div class="mb-3 rounded overflow-hidden" style="background: rgba(0, 0, 0, .1)">
      <img style="width: 100%; height: 230px" class="object-cover object-center" :src="getCoverUri(data.coverUri)"
        alt="cover">
    </div>
    <div class="px-5 pt-2 pb-4">
      <Category class="mb-1" :category="data.sort" />
      <div class="mb-2 break-words">{{ data.title }}</div>
      <div class="mb-2">
        <a-avatar-group :size="24" :max-count="3">
          <a-avatar v-for="(item, index) in data.rates" :key="index">
            <img :src="getAvatar(item)" />
          </a-avatar>
        </a-avatar-group>
      </div>
      <div class="flex justify-between items-center">
        <a-rate :default-value="+data.score" readonly disabled />
        <span>{{ +data.score && (+data.score).toFixed(1) }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.show-card {
  background: linear-gradient(180deg, #363636 0%, #3D3E44 0%, #3F4D6B 54%, #232534 99%);
  border: 6px solid rgba(52, 46, 62, 1);
  transition: box-shadow .15s;

  :deep(.arco-rate-character:not(:last-child)) {
    margin-right: 4px;
  }

  &:hover {
    box-shadow: 0 2px 10px rgba(255, 255, 255, 0.2);
  }
}
</style>

