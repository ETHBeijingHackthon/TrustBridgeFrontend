<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Category, Upload, CommentCard } from '@/components'
import { getAvatar, getCoverUri, formatAddress } from '@/utils/common'
import { getNftcreatedEntities } from '@/apis'

const { query: { id } } = useRoute()

console.log(id)
const Detail = reactive({
  data: {
    coverUri: '',
    sort: 1,
    title: '',
    owner: '',
    score: 0,
    collectCount: 0,
    reviewCount: 0,
    description: ''
  },
  coverUri: '',
  sort: 1,
  title: '',
  owner: '',
  score: 0,
  collectCount: 2,
  reviewCount: 0,
  // rates: ['a', 'b'],
  description: '',
  form: {
    point: 0,
    comments: '',
    media: '',
    cid: '',
  },
  comments: [
    {
      postby: '0x333....423d',
      point: 0,
      comment: 'desc',
      media: '1'
    }
  ],
  getDetail() {
    getNftcreatedEntities(`where: {id: "${id}"}, first: 1`)
      .then(res => {
        const data = res.nftcreatedEntities[0]
        if (data) {
          Detail.data = data
          Detail.data.coverUri = getCoverUri(data.coverUri)
        }
      })
  }
})

onMounted(() => {
  Detail.getDetail()
})
</script>

<template>
  <div class="detail flex justify-center pt-16">
    <div class="detail__left w-[380px] mr-20 text-center">
      <div class="detail__left__image mb-7 rounded">
        <img :src="Detail.data.coverUri" style="width: 368px; height: 368px"
          class="rounded overflow-hidden object-cover object-center" alt="item cover">
      </div>
      <Category :category="Detail.data.sort" class="justify-center mb-2" :showLable="true" />
      <div class="mb-4 text-4xl break-words">{{ Detail.data.title }}</div>
      <div class="mb-6 text-[#B9B9B9]">Posted by {{ formatAddress(Detail.data.owner) }}</div>
      <div class="mb-2 text-3xl">{{ +Detail.data.score && (+Detail.data.score).toFixed(1) }}</div>
      <a-rate :model-value="Detail.data.score" disabled />
      <div class="mt-4 mb-6 text-[#B9B9B9]">
        <!-- <a-avatar-group :size="24" :max-count="3">
                          <a-avatar v-for="(item, index) in Detail.rates" :key="index">
                            <img :src="getAvatar(item)" />
                          </a-avatar>
                        </a-avatar-group> -->
        <span>{{ Detail.data.reviewCount }}</span>
      </div>
      <a-button class="ml-auto mr-4" size="large">
        <template #icon>
          <icon-star :size="20" />
        </template>
        Collect ({{ Detail.data.collectCount }})
      </a-button>
    </div>
    <div class="detail__right w-[600px]">
      <div class="detail__right__title">Description</div>
      <div class="detail__right__wrap mb-10">{{ Detail.data.description }}</div>
      <div class="detail__right__title">Comment</div>
      <div class="detail__right__wrap mb-10">
        <a-form>
          <a-form-item field="point" label="Point" :rules="[{ required: true, message: 'point is required' }]">
            <a-rate :default-value="Detail.form.point" />
          </a-form-item>
          <a-form-item field="comments" label="Comments">
            <a-textarea v-model="Detail.form.comments" placeholder="Please enter your comments" allow-clear />
          </a-form-item>
          <a-form-item field="media" label="Media">
            <a-radio-group v-model="Detail.form.media">
              <a-radio value="1">img</a-radio>
              <a-radio value="2">video</a-radio>
              <a-radio value="3">audio</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item>
            <Upload />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" long>Submit</a-button>
          </a-form-item>
        </a-form>
      </div>
      <div class="detail__right__title">List</div>
      <ul>
        <li class="mb-4" v-for="(comment, index) in Detail.comments" :key="index">
          <CommentCard :data="comment" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
.detail {
  &__left {
    &__image {
      background: linear-gradient(180deg, #363636 0%, #3D3E44 0%, #3F4D6B 54%, #232534 99%);
      box-sizing: border-box;
      padding: 6px;
    }
  }

  &__right {
    &__title {
      @apply mb-3 text-lg font-bold;
    }

    &__wrap {
      border: 1px solid #525252;
      color: #B9B9B9;
      @apply rounded p-4 px-5 text-justify;
    }

    :deep(.arco-radio-label) {
      color: #fff;
    }
  }
}
</style>