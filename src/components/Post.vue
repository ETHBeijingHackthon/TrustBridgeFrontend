<script setup>
import { ref, reactive, toRaw } from 'vue'
import { useSigner } from 'vagmi'
import { Message } from '@arco-design/web-vue'
import Medias from '@/contants/media'
import Category from '@/contants/category'
import { Upload } from '@/components'
import { geneTrustBridgeContract } from '@/contracts'
import { notiWaiting, notiError } from '@/utils/common'

const { data } = useSigner()
const formRef = ref(null)
const coverRef = ref(null)
const mediaRef = ref(null)

const Post = reactive({
  visible: false,
  disabled: false,
  form: {
    title: '',
    category: '',
    desc: '',
    cover: '',
    mediaCate: '1',
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
  }
})
</script>

<template>
  <div>
    <div @click="Post.visible = true">
      <slot />
    </div>

    <a-modal v-model:visible="Post.visible" :footer="false" title="Post a new item">
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
          <a-textarea v-model="Post.form.desc" placeholder="Please enter description..." rows="4" />
        </a-form-item>
        <a-form-item field="cover" label="Cover">
          <Upload ref="coverRef" @onSuccess="Post.handleCoverUpload" />
        </a-form-item>
        <a-form-item field="mediaType" label="Media">
          <a-radio-group v-model="Post.form.mediaCate">
            <a-radio :value="media.key" v-for="media in Medias" :key="media.key">{{ media.label }}</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item filed="media">
          <Upload ref="mediaRef" @onSuccess="Post.handleMediaUpload" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" size="large" html-type="submit" long>Create</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>