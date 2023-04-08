<script setup>
import { getCoverUri } from '@/utils/common'
import { DefaultCover } from '@/components'

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
</script>

<template>
  <div class="cover h-full">
    <img v-if="getCoverUri(coverUri)" class="w-full h-full object-cover object-center min-h-[230px]"
      :src="getCoverUri(coverUri)" alt="cover">
    <DefaultCover class="w-[70px] h-[70px]" :sort="sort" v-else />
  </div>
</template>