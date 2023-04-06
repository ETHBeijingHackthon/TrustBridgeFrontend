<script setup>
import { reactive } from 'vue'
import Category from '@/contants/category'
import { Upload } from '@/components'

const Post = reactive({
  visible: false,
  form: {
    title: '',
    category: '',
    desc: '',
    cover: '',
    mediaCate: '',
    media: ''
  }
})
</script>

<template>
  <div>
    <div @click="Post.visible = true">
      <slot />
    </div>

    <a-modal v-model:visible="Post.visible" :footer="false" title="Post a new item">
      <a-form :model="Post.form" layout="vertical">
        <a-form-item field="name" label="Username">
          <a-input v-model="Post.form.title" placeholder="please enter title..." />
        </a-form-item>
        <a-form-item field="category" label="Post">
          <a-select v-model="Post.form.category" placeholder="Please select ...">
            <a-option v-for="item in Category" :key="item.key" :value="item.key">{{ item.label }}</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="desc" label="Description">
          <a-textarea v-model="Post.form.desc" placeholder="Please enter description..." rows="4" />
        </a-form-item>
        <a-form-item field="cover" label="Cover">
          <Upload />
        </a-form-item>
        <a-form-item field="mediaType" label="Media">
          <a-radio-group v-model="Post.form.media">
            <a-radio value="1">img</a-radio>
            <a-radio value="2">video</a-radio>
            <a-radio value="3">audio</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item field="media">
          <Upload />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" long>Create</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style scoped></style>