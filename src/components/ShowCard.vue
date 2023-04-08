<script setup>
import { Category, Cover } from '@/components'
import { getAvatar } from '@/utils/common'

defineProps({
  data: {
    type: Object,
    default: () => ({
      id: '',
      coverUri: '',
      title: '',
      sort: 0,
      title: '',
      reviewCount: 0,
      score: 0
    })
  }
})
</script>

<template>
  <div class="show-card rounded cursor-pointer">
    <div class="mb-3 rounded overflow-hidden h-[230px]" style="background: rgba(0, 0, 0, .1)">
      <Cover :coverUri="data.coverUri" :sort="data.sort" />
    </div>
    <div class="px-5 pt-2 pb-4">
      <Category class="mb-1" :category="data.sort" />
      <div class="mb-2 break-words">{{ data.title }}</div>
      <div class="mb-2">
        <a-avatar-group :size="24" :max-count="3">
          <a-avatar v-for="(item, index) in +data.reviewCount < 3 ? +data.reviewCount : 3 " :key="index">
            <img :src="getAvatar(data.id + index)" />
          </a-avatar>
        </a-avatar-group>
        <span class="ml-1">{{ data.reviewCount }} commented</span>
      </div>
      <div class="flex justify-between items-center">
        <a-rate :default-value="+data.score / 2" readonly disabled allow-half />
        <span>{{ +data.score && (+data.score / 2).toFixed(1) }}</span>
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

