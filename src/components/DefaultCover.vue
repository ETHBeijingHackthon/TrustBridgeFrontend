<script setup>
import { computed } from 'vue'
import Category from '@/contants/category'

const props = defineProps({
  sort: {
    type: [String, Number],
    defalt: ''
  }
})

const currentCate = computed(() => Category.filter(item => +item.key === +props.sort)[0])
</script>

<template>
  <div class="default-cover rounded">
    <div class="w-[70px] h-[70px] bg-no-repeat bg-center" :class="[currentCate?.className]"></div>
  </div>
</template>

<style lang="less" scope>
.default-cover {
  background: url(../assets/images/default-bg.jpg) center center / cover;
  @apply h-full w-full flex items-center justify-center;
}
</style>