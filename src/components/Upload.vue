<script setup>
import { ref } from 'vue'
import { IconEdit, IconPlus } from '@arco-design/web-vue/es/icon';
import { notiError } from '@/utils/common'

const emits = defineEmits(['onSuccess'])
const file = ref();
const web3StorageKey = import.meta.env.VITE_WEB3STORAGE_KEY

const onChange = (_, currentFile) => {
  file.value = {
    ...currentFile,
  };
};
const onProgress = (currentFile) => {
  // file.value = currentFile;
};

const onSuccess = (e) => {
  console.log(e);
  emits('onSuccess', e.response);
}

const onError = () => {
  file.value = null
  notiError('An error occurred uploading photos.')
}

const clearFiles = () => {
  file.value = null;
}

defineExpose({
  clearFiles,
})

</script>

<template>
  <a-upload action="https://api.web3.storage/upload" :fileList="file ? [file] : []" :show-file-list="false"
    :headers="{ Authorization: `Bearer ${web3StorageKey}` }" @change="onChange" @progress="onProgress"
    @success="onSuccess" @error="onError">
    <template #upload-button>
      <div :class="`arco-upload-list-item${file && file.status === 'error' ? ' arco-upload-list-item-error' : ''
        }`">
        <div class="arco-upload-list-picture custom-upload-avatar" v-if="file && file.url">
          <img :src="file.url" />
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
    </template>
  </a-upload>
</template>

<style scoped></style>