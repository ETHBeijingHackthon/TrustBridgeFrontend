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
    <img v-if="getCoverUri(coverUri)" style="width: 100%; height: 230px" class="object-cover object-center"
      :src="getCoverUri(coverUri)" alt="cover">
    <div class="cover__default" v-else>
      <div class="w-[70px] h-[70px] bg-no-repeat bg-center" :class="[currentCate?.className]"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.cover {
  &__default {
    background: url(../assets/images/default-bg.png) center center / cover;
    @apply h-full flex items-center justify-center;
  }
}
</style>