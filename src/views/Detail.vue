<script setup>
import { ref, toRaw, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSigner } from 'vagmi'
import { Message } from '@arco-design/web-vue'
import { geneTrustBridgeContract } from '@/contracts'
import Medias from '@/contants/media'
import { Category, Upload, CommentCard, Cover } from '@/components'
import { getAvatar, getCoverUri, formatAddress, notiWaiting, notiError } from '@/utils/common'
import { queryTrustBridge, getNftreviewedEntities } from '@/apis'

const formRef = ref(null)
const mediaRef = ref(null)
const { query: { id } } = useRoute()
const { data } = useSigner()

const Detail = reactive({
  disabledForm: false,
  disabledCollect: false,
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
  form: {
    point: 0,
    comments: '',
    mediaType: '1',
    multiMedia: '',
  },
  comments: [
    {
      postby: '',
      point: 0,
      comment: '',
      media: '1'
    }
  ],
  getDetailAndComments() {
    queryTrustBridge(`{
      nftreviewedEntities(first: 10, where: {nftId: "${parseInt(id.slice(2), 16)}"}) {id mediaType multimedia nftId reviewer score description },
      nftcreatedEntities(first: 1, where: {id: "${id}"}) { id owner nftId fid mediaType multimedia reviewCount
      score sort title collectCount coverUri description }
      }`)
      .then(res => {
        const data = res.nftcreatedEntities[0]
        if (data) {
          Detail.data = data
          Detail.data.coverUri = getCoverUri(data.coverUri)
        }

        Detail.comments = res.nftreviewedEntities
      })
  },
  handleSubmit({ values, errors }) {
    if (errors) return
    Detail.disabledForm = true
    const wait = notiWaiting()
    const trustBridgeContract = geneTrustBridgeContract(toRaw(data.value))
    trustBridgeContract.reviewNFT(id, values.point * 2, values.comments, values.mediaType, values.multiMedia)
      .then(async tx => {
        await tx.wait()
        formRef.value.resetFields()
        mediaRef.value.clearFiles()
        Message.success('Successfully posted！')
        Detail.handleRefreshComment()
      })
      .catch(err => {
        console.log(err);
        wait.close()
        notiError(err.reason || err.message);
      })
      .finally(() => {
        Detail.disabledForm = false
        wait.close()
      })
  },
  handleCoverUpload(res) {
    Detail.form.multiMedia = res.cid
  },
  handleRefreshComment() {
    getNftreviewedEntities(`first: 10, where: {nftId: "${parseInt(id.slice(2), 16)}"}`)
      .then(res => {
        console.log(res);
      })
  },
  handleCollect() {
    Detail.disabledCollect = true
    const wait = notiWaiting()
    const trustBridgeContract = geneTrustBridgeContract(toRaw(data.value))
    trustBridgeContract.collectNFT(parseInt(id.slice(2), 16))
      .then(async tx => {
        await tx.wait()
        wait.close()
      })
      .catch(err => {
        console.log(err);
        wait.close()
        notiError(err.reason || err.message);
        Detail.disabledCollect = false
      })
  }
})

onMounted(() => {
  Detail.getDetailAndComments()
})
</script>

<template>
  <div class="detail flex justify-center pt-16">
    <div class="detail__left w-[380px] mr-20 text-center">
      <div class="detail__left__image mb-7 rounded">
        <Cover class="h-[368px]" :coverUri="Detail.data.coverUri" :sort="Detail.data.sort" />
      </div>
      <Category :category="Detail.data.sort" class="justify-center mb-2" :showLable="true" />
      <div class="mb-4 text-4xl break-words">{{ Detail.data.title }}</div>
      <div class="mb-6 text-[#B9B9B9]">Posted by {{ formatAddress(Detail.data.owner) }}</div>
      <div class="mb-2 text-3xl">{{ +Detail.data.score && (+Detail.data.score / 2).toFixed(1) }}</div>
      <a-rate :model-value="Detail.data.score / 2" disabled allow-half />
      <div class="mt-4 mb-6 text-[#B9B9B9]">
        <a-avatar-group :size="24" :max-count="3">
          <a-avatar v-for="(item, index) in (Detail.data.reviewCount < 3 ? Detail.data.reviewCount : 3)" :key="index">
            <img :src="getAvatar(id + index)" />
          </a-avatar>
        </a-avatar-group>
        <span class="ml-1">{{ Detail.data.reviewCount }} commented</span>
      </div>
      <a-button :disabled="Detail.disabledCollect" @click="Detail.handleCollect" class="ml-auto mr-4" size="large">
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
        <a-form ref="formRef" :model="Detail.form" :disabled="Detail.disabledForm" @submit="Detail.handleSubmit">
          <a-form-item field="point" label="Point" :rules="[{ type: 'number', min: 0.5 }]" required>
            <a-rate v-model="Detail.form.point" :count="5" allow-half />
          </a-form-item>
          <a-form-item field="comments" label="Comments">
            <a-textarea v-model="Detail.form.comments" placeholder="Please enter your comments" allow-clear />
          </a-form-item>
          <a-form-item field="mediaType" label="Media">
            <a-radio-group v-model="Detail.form.mediaType">
              <a-radio :value="media.key" v-for="media in   Medias" :key="media.key">{{ media.label }}</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item field="multiMedia">
            <Upload ref="mediaRef" @onSuccess="Detail.handleCoverUpload" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" size="large" html-type="submit" long>Submit</a-button>
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