<script setup>
import { ref, toRaw, reactive, onMounted, nextTick, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useSigner, useAccount } from 'vagmi'
import { Message } from '@arco-design/web-vue'
import { geneTrustBridgeContract } from '@/contracts'
import Medias from '@/contants/media'
import { Category, Upload, CommentCard, DefaultCover } from '@/components'
import { getAvatar, getCoverUri, formatAddress, notiWaiting, notiError } from '@/utils/common'
import { queryTrustBridge, getNftreviewedEntities } from '@/apis'

const formRef = ref(null)
const mediaRef = ref(null)
const videoRef = ref(null)
const { query: { id } } = useRoute()
const { data } = useSigner()
const { address, isConnected } = useAccount()

const Detail = reactive({
  disabledForm: false,
  disabledCollect: false,
  disabledSubmit: false,
  ifCollected: false,
  visiblePlayer: false,
  mediaSrc: '',
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
    mediaType: 1,
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
        }

        Detail.comments = res.nftreviewedEntities
      })
  },
  getIfCollect() {
    if (!isConnected.value) return
    queryTrustBridge(`{
      nftcollectedEntities(first: 1, where: {nftId: "${parseInt(id.slice(2), 16)}", collector: "${address.value}"}) {id}}`)
      .then(res => {
        Detail.ifCollected = Boolean(res.nftcollectedEntities.length)
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
        Message.success('Successfully posted!')
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
        Message.success('Successfully collected!')
      })
      .catch(err => {
        console.log(err);
        wait.close()
        notiError(err.reason || err.message);
        Detail.disabledCollect = false
      })
  },
  async handleOpenPlay() {
    Detail.visiblePlayer = true
    if (Detail.data.mediaType == 'video') {
      Detail.mediaSrc = getCoverUri(Detail.data.multimedia)
      await nextTick()
      videoRef.value.load()
      videoRef.value.play()
    }
  },
  handleUploadChange() {
    Detail.disabledSubmit = true
  },
  handleUploadEnd() {
    Detail.disabledSubmit = false
  },
  handleCloseModal() {
    videoRef.value.pause()
  }
})

let si;

onMounted(() => {
  Detail.getDetailAndComments()
  Detail.getIfCollect()

  si = setInterval(() => {
    Detail.getDetailAndComments()
  }, import.meta.env.VITE_REFRESH_DURATION * 1000);
})

onBeforeUnmount(() => {
  if (si) clearInterval(si)
})
</script>

<template>
  <div class="detail flex justify-center pt-16">
    <div class="detail__left w-[380px] mr-20 text-center">
      <div class="detail__left__image mb-7 rounded h-[368px] relative">
        <template v-if="Detail.data.mediaType == 'video'">
          <a-image v-if="getCoverUri(Detail.data.coverUri)" :src="getCoverUri(Detail.data.coverUri)" width="368"
            height="356" fit="cover" />
          <DefaultCover class="h-full" :sort="Detail.data.sort" v-else />
          <!-- media -->
          <div v-if="Detail.data.mediaType && getCoverUri(Detail.data.multimedia)"
            class="play absolute top-0 bottom-0 left-0 right-0 bg-black/70 z-10 flex items-center justify-center">
            <icon-play-circle-fill :size="68" class="cursor-pointer" @click="Detail.handleOpenPlay" />
          </div>
        </template>
        <template v-else-if="Detail.data.mediaType == 'image'">
          <a-image v-if="getCoverUri(Detail.data.multimedia)" :src="getCoverUri(Detail.data.multimedia)" width="368"
            height="356" fit="cover" />
        </template>
        <template v-else="">
          <a-image v-if="getCoverUri(Detail.data.coverUri)" :src="getCoverUri(Detail.data.coverUri)" width="368"
            height="356" fit="cover" />
          <DefaultCover class="h-full" :sort="Detail.data.sort" v-else />
        </template>
        <!-- <a-image v-if="getCoverUri(Detail.data.coverUri)" :src="getCoverUri(Detail.data.coverUri)" width="368"
                height="356" fit="cover" />
              <DefaultCover class="h-full" :sort="Detail.data.sort" v-else />
              <div v-if="Detail.data.mediaType && getCoverUri(Detail.data.multimedia)"
                class="play absolute top-0 bottom-0 left-0 right-0 bg-black/70 z-10 flex items-center justify-center">
                <icon-play-circle-fill :size="68" class="cursor-pointer" @click="Detail.handleOpenPlay" />
              </div> -->
      </div>
      <Category :category="Detail.data.sort" class="justify-center mb-2" :showLable="true" />
      <div class="mb-4 text-4xl break-words">{{ Detail.data.title }}</div>
      <div class="mb-6 text-[#B9B9B9]">Posted by {{ formatAddress(Detail.data.owner) }}</div>
      <div class="mb-2 text-xl flex justify-center items-center"><a-rate :model-value="Detail.data.score / 2" disabled
          allow-half />
        <span class="ml-2">{{
          +Detail.data.score
          && (+Detail.data.score / 2).toFixed(1) }}</span>
      </div>

      <div class="mt-4 mb-6 text-[#B9B9B9]">
        <a-avatar-group :size="24" :max-count="3">
          <a-avatar v-for="(item, index) in (Detail.data.reviewCount < 3 ? Detail.data.reviewCount : 3)" :key="index">
            <img :src="getAvatar(id + index)" />
          </a-avatar>
        </a-avatar-group>
        <span class="ml-1">{{ Detail.data.reviewCount }} commented</span>
      </div>
      <a-button :disabled="!isConnected || Detail.disabledCollect || Detail.ifCollected" @click="Detail.handleCollect"
        class="ml-auto mr-4" size="large">
        <template #icon>
          <icon-star :size="20" />
        </template>
        Collect ({{ Detail.data.collectCount }})
      </a-button>
    </div>
    <div class="detail__right w-[600px]">
      <div class="detail__right__title">Description</div>
      <div class="mb-10 text-base text-[#B9B9B9] text-justify">{{ Detail.data.description }}</div>
      <div class="detail__right__title">Comment</div>
      <div class="detail__right__wrap mb-10">
        <a-form ref="formRef" :model="Detail.form" :disabled="Detail.disabledForm || !isConnected"
          @submit="Detail.handleSubmit">
          <a-form-item field="point" label="Point" :rules="[{ type: 'number', min: 0.5 }]" required>
            <a-rate v-model="Detail.form.point" :count="5" allow-half />
          </a-form-item>
          <a-form-item field="comments" label="Comments">
            <a-textarea v-model="Detail.form.comments" placeholder="Please enter your comments" :auto-size="{
              minRows: 2,
              maxRows: 5
            }" allow-clear />
          </a-form-item>
          <a-form-item field="mediaType" label="Media">
            <a-radio-group v-model="Detail.form.mediaType">
              <a-radio :value="media.key" v-for="media in  Medias" :key="media.key">{{ media.label }}</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item field="multiMedia">
            <Upload ref="mediaRef" :sort="Detail.form.mediaType" @onChange="Detail.handleUploadChange"
              @onEnd="Detail.handleUploadEnd" @onSuccess="Detail.handleCoverUpload" />
          </a-form-item>
          <a-form-item>
            <a-button :disabled="Detail.disabledSubmit" type="primary" size="large" html-type="submit"
              long>Submit</a-button>
          </a-form-item>
        </a-form>
      </div>
      <div class="detail__right__title">List</div>
      <ul v-if="Detail.comments.length">
        <li class="mb-4" v-for="(comment, index) in Detail.comments" :key="index">
          <CommentCard :data="comment" />
        </li>
      </ul>
      <div class="detail__right__wrap" v-else>
        <a-empty />
      </div>
    </div>
  </div>
  <a-modal title="Player" v-model:visible="Detail.visiblePlayer" @close="Detail.handleCloseModal" :width="520"
    :footer="false" simple>
    <div v-if="Detail.data.mediaType == 'image'" class="flex items-center justify-center">
      <a-image :src="getCoverUri(Detail.data.multimedia)" :width="400" :height="400" />
    </div>
    <video v-else-if="Detail.data.mediaType == 'video'" ref="videoRef" controls="controls" autoplay="autoplay"
      class="w-full object-contain">
      <source :src="Detail.mediaSrc" type="video/mp4" />
    </video>
  </a-modal>
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
      @apply rounded p-5 px-7 text-justify;
    }

    :deep(.arco-radio-label) {
      color: #fff;
    }
  }
}
</style>