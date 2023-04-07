<script setup>
import { computed } from 'vue'
import { getCoverUri } from '@/utils/common'
import Category from '@/contants/category'

const props = defineProps({
  coverUri: {
    type: String,
    default: ''
  },
  sort: {
    type: [String, Number],
    defalt: ''
  }
})

const currentCate = computed(() => Category.filter(item => +item.key === +props.sort)[0])
</script>

<template>
  <div class="cover">
    <a-image v-if="getCoverUri(coverUri)" fit="cover" class="object-center" :src="getCoverUri(coverUri)" />
    <div class="cover__default rounded" v-else>
      <div class="w-[70px] h-[70px] bg-no-repeat bg-center" :class="[currentCate?.className]"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.cover {
  &__default {
    background: url(../assets/images/default-bg.jpg) center center / cover;
    @apply h-full flex items-center justify-center;
  }
}
</style>