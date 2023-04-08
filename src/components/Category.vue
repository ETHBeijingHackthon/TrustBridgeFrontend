<script setup>
import { computed } from 'vue'
import Category from '@/contants/category'

const props = defineProps({
  category: {
    type: [String, Number],
    default: '1'
  },
  showLable: {
    type: Boolean,
    default: false
  }
})

const currentCate = computed(() => Category.filter(item => +item.key === +props.category)[0])
</script>

<template>
  <div class="flex items-center">
    <div class="w-6 h-6 mr-1 bg-center bg-contain bg-no-repeat" :class="[currentCate?.className]"></div>
    <span v-if="showLable" class="text-lg">{{ currentCate?.label }}</span>
  </div>
</template>

<style scoped></style>