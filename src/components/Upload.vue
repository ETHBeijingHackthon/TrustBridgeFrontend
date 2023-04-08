<script setup>
import { ref } from 'vue'
import { IconEdit, IconPlus } from '@arco-design/web-vue/es/icon';
import { notiError } from '@/utils/common'

const props = defineProps({
  ifCover: {
    type: Boolean,
    default: false
  },
  sort: {
    type: [String, Number],
    default: '1'
  }
})

const emits = defineEmits(['onSuccess', 'onChange', 'onEnd'])
const file = ref();
const web3StorageKey = import.meta.env.VITE_WEB3STORAGE_KEY

const onChange = (_, currentFile) => {
  file.value = {
    ...currentFile,
  };
  if (currentFile.status == 'init') emits('onChange')
};
const onProgress = (currentFile) => {
  // file.value = currentFile;
};

const onSuccess = (e) => {
  emits('onSuccess', e.response);
  emits('onEnd')
}

const onError = () => {
  file.value = null
  emits('onEnd')
  notiError('An error occurred uploading photos.')
}

const onExceedLimit = () => {
  emits('onEnd')
}

const clearFiles = () => {
  file.value = null;
}

defineExpose({
  clearFiles,
})

</script>

<template>
  <a-upload action="https://api.web3.storage/upload" :fileList="file ? [file] : []" :show-file-list="!ifCover"
    :headers="{ Authorization: `Bearer ${web3StorageKey}` }" @change="onChange" @progress="onProgress"
    @success="onSuccess" @error="onError" @exceed-limit="onExceedLimit">
    <template #upload-button>
      <div v-if="ifCover" :class="`arco-upload-list-item${file && file.status === 'error' ? ' arco-upload-list-item-error' : ''
        }`">
        <div class="arco-upload-list-picture custom-upload-avatar" v-if="file && file.url">
          <img :src="file.url" class="object-cover" />
          <div class="arco-upload-list-picture-mask">
            <IconEdit />
          </div>
          <!-- <a-progress v-if="file.status === 'uploading' && file.percent < 100" type="circle" size="mini" /> -->
          <a-spin v-if="file.status === 'uploading'" :style="{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
          }" />
          <!-- <a-progress v-if="file.status === 'done'" type="circle" size="mini" status='success' :style="{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translateX(-50%) translateY(-50%)',
                  }" /> -->
        </div>
        <div class="arco-upload-picture-card" style="background-color: #9D9B9B;" v-else>
          <div class="arco-upload-picture-card-text">
            <IconPlus />
          </div>
        </div>
      </div>
      <a-button v-else type="dashed" size="large" shape="round">
        <icon-image v-if="sort == '1'" :size="16" />
        <icon-live-broadcast v-else-if="sort == '2'" :size="16" />
        <icon-music v-else-if="sort == '3'" :size="16" />
        <span class="ml-1">Upload</span>
      </a-button>
    </template>
  </a-upload>
</template>

<style scoped></style>