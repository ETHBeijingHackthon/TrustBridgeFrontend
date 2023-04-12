<script setup>
import { ref, reactive, toRaw } from 'vue'
import { useSigner, useAccount, useNetwork, useSwitchNetwork } from 'vagmi'
import { Message } from '@arco-design/web-vue'
import Medias from '@/contants/media'
import Category from '@/contants/category'
import { Upload, VerifyNetwork } from '@/components'
import { geneTrustBridgeContract } from '@/contracts'
import { notiWaiting, notiError, isMobile } from '@/utils/common'

const { data } = useSigner()
const { isConnected } = useAccount()
const { chain } = useNetwork();
const { switchNetwork }
  = useSwitchNetwork({
    onError(error) {
      notiError(error.internal.message)
    }
  });

const formRef = ref(null)
const coverRef = ref(null)
const mediaRef = ref(null)
const chainTarget = {
  id: import.meta.env.VITE_CHAIN_ID,
  name: import.meta.env.VITE_CHAIN_NAME,
  idDecimal: import.meta.env.VITE_CHAIN_ID_DECIMAL
}

const Post = reactive({
  visible: false,
  disabled: false,
  disabledSubmit: false,
  form: {
    title: '',
    category: '',
    desc: '',
    cover: '',
    mediaCate: Medias[0].key,
    media: ''
  },
  handleSubmit({ values, errors }) {
    if (errors) return
    Post.disabled = true
    const wait = notiWaiting()
    const trustBridgeContract = geneTrustBridgeContract(toRaw(data.value))
    trustBridgeContract.createNFT(values.category, values.cover, values.mediaCate, values.media, values.title, values.desc)
      .then(async tx => {
        await tx.wait()
        formRef.value.resetFields()
        coverRef.value.clearFiles()
        mediaRef.value.clearFiles()
        Post.visible = false
        Message.success('Successfully posted！')
      })
      .catch(err => {
        Post.disabled = false
        wait.close()
        notiError(err.reason || err.message);
      })
      .finally(() => {
        Post.disabled = false
        wait.close()
      })
  },
  handleCoverUpload(res) {
    Post.form.cover = res.cid
  },
  handleMediaUpload(res) {
    Post.form.media = res.cid
  },
  handleClick() {
    if (!isConnected.value) {
      Message.info('Please connect your wallet.')
      return
    }

    Post.visible = true
  },
  handleUploadEnd() {
    Post.disabledSubmit = false
  },
  handleUploadChange() {
    Post.disabledSubmit = true
  },
  handleCloseModal() {
    formRef.value.resetFields()
    coverRef.value.clearFiles()
    mediaRef.value.clearFiles()
  }
})
</script>

<template>
  <div>
    <div @click="Post.handleClick">
      <slot />
    </div>

    <a-modal v-model:visible="Post.visible" :footer="false" :width="isMobile() ? '90%' : 540" title="Post a new item"
      @close="Post.handleCloseModal">
      <a-form :model="Post.form" :disabled="Post.disabled" ref="formRef" layout="vertical" @submit="Post.handleSubmit">
        <a-form-item field="title" label="Title" required>
          <a-input v-model="Post.form.title" placeholder="please enter title..." />
        </a-form-item>
        <a-form-item field="category" label="Category" required>
          <a-select v-model="Post.form.category" placeholder="Please select ...">
            <a-option v-for="item in Category.slice(1)" :key="item.key" :value="item.key">{{ item.label }}</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="desc" label="Description" required>
          <a-textarea v-model="Post.form.desc" placeholder="Please enter description..." :auto-size="{
            minRows: 2,
            maxRows: 5
          }" />
        </a-form-item>
        <a-form-item field="cover" label="Cover">
          <Upload ref="coverRef" :ifCover="true" @onChange="Post.handleUploadChange" @onEnd="Post.handleUploadEnd"
            @onSuccess="Post.handleCoverUpload" />
        </a-form-item>
        <a-form-item field="mediaCate" label="Media">
          <a-radio-group v-model="Post.form.mediaCate">
            <a-radio :value="media.key" v-for="media in Medias" :key="media.key">{{ media.label }}</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item filed="media">
          <Upload ref="mediaRef" :sort="Post.form.mediaCate" @onChange="Post.handleUploadChange"
            @onEnd="Post.handleUploadEnd" @onSuccess="Post.handleMediaUpload" />
        </a-form-item>
        <a-form-item>
          <VerifyNetwork>
            <a-button :disabled="Post.disabledSubmit" type="primary" size="large" html-type="submit"
              long>Create</a-button>
          </VerifyNetwork>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>