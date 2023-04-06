<script setup>
import { Category } from '@/components'

defineProps({
  data: {
    type: Object,
    default: () => ({
      imgUrl: '',
      title: '',
      category: 0,
      title: '',
      rates: [],
      point: 0
    })
  }
})
</script>

<template>
  <div class="show-card rounded cursor-pointer">
    <img style="width: 100%; height: 230px" class="mb-3 object-cover object-center rounded overflow-hidden"
      :src="data.imgUrl" alt="cover">
    <div class="px-5 pt-2 pb-4">
      <Category class="mb-1" :category="data.category" />
      <div class="mb-2 break-words">{{ data.title }}</div>
      <div class="mb-2">
        <a-avatar-group :size="24" :max-count="3">
          <a-avatar v-for="(item, index) in data.rates" :key="index">
            <img :src="`https://robohash.org/${item}.png?set=set3&size=1200x1200`" />
          </a-avatar>
        </a-avatar-group>
      </div>
      <div>
        <a-rate :default-value="data.point" readonly disabled />
        <span>{{ data.point }}</span>
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

