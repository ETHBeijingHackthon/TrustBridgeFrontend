<script setup>
import { reactive, onMounted } from 'vue'
import { useAccount } from 'vagmi'
import { useRouter } from 'vue-router'
import Category from '@/contants/category'
import { ShowCard, Post } from '@/components'
import { getNftcreatedEntities, getNftcollectedEntities, queryTrustBridge } from '@/apis'

const pageSize = 10
const { address, isConnected } = useAccount()
const USE_ROUTER = useRouter()
const Home = reactive({
  loading: false,
  skip: 0,
  category: '1',
  list: [],
  getCreatedNft() {
    // Home.list = []
    // Home.loading = true
    let query = ''

    switch (Home.category) {
      case '1': case '2': case '3': case '4': case '5': case '6':
        query = `where: {fid: 0${Home.category == '1' ? '' : `, sort: "${Home.category}"`}}, first: ${pageSize}, skip: ${Home.skip}`
        break
      case 'posted':
        query = `where: {fid: 0, owner: "${address.value}"}, first: ${pageSize}, skip: ${Home.skip}`
        break
    }

    getNftcreatedEntities(query)
      .then(res => {
        Home.list = res.nftcreatedEntities
      })
      .finally(() => {
        Home.loading = false
      })
  },
  getPosted() {
    Home.category = 'posted'
    Home.skip = 0
    Home.loading = true
    Home.list = []
    Home.getCreatedNft()
  },
  getCollected() {
    Home.category = 'collected'
    Home.skip = 0
    Home.loading = true
    Home.list = []
    getNftcollectedEntities(`first: ${pageSize}, skip: ${Home.skip}, where: {collector: "${address.value}"}`)
      .then(res => {
        const ids = res.nftcollectedEntities.map(item => item.nftId)
        queryTrustBridge(`{ nftcreatedEntities(where: { nftId_in: [${ids}], fid: 0 }, first: ${pageSize}) { id, nftId, owner, sort, coverUri, mediaType, multimedia, title, description, score, collectCount,reviewCount, fid } }`)
          .then(res => {
            Home.list = res.nftcreatedEntities
          })
          .finally(() => {
            Home.loading = false
          })
      })
      .catch(() => {
        Home.loading = false
      })
  },
  getData() {
    if (Home.category != 'collected') {
      Home.getCreatedNft()
    } else {
      Home.getCollected()
    }
  },
  handleTabChange(key) {
    Home.category = key
    Home.skip = 0
    Home.loading = true
    Home.list = []
    Home.getCreatedNft()
  },
  handleToDetail(id) {
    USE_ROUTER.push({
      path: '/detail',
      query: { id }
    })
  },
  handlePrev() {
    if (Home.skip == 0) return
    Home.loading = true
    Home.list = []
    Home.skip -= pageSize
    Home.getCreatedNft()
  },
  handleNext() {
    Home.loading = true
    Home.list = []
    Home.skip += pageSize
    Home.getCreatedNft()
  },
})

onMounted(() => {
  Home.getData()
  setInterval(() => {
    Home.getData()
  }, import.meta.env.VITE_REFRESH_DURATION * 1000)
})
</script>

<template>
  <div class="home">
    <div class="home__top">
      <h1 class="text-[48px] font-bold">Build and discover trust.</h1>
      <Post>
        <a-button size="large" type="primary">Post New Item</a-button>
      </Post>
    </div>
    <div class="home__bottom">
      <a-tabs :active-key="Home.category" size="large" @change="Home.handleTabChange">
        <a-tab-pane v-for="item in Category" :key="item.key" :title="item.label">
        </a-tab-pane>
        <template #extra>
          <a-button :disabled="!isConnected" class="ml-auto mr-4"
            :class="{ 'btn-tab-selected': Home.category === 'posted' }" size="large" @click="Home.getPosted">
            <template #icon>
              <icon-send :size="20" />
            </template>
            Posted
          </a-button>
          <a-button :class="{ 'btn-tab-selected': Home.category === 'collected' }" :disabled="!isConnected" size="large"
            @click="Home.getCollected">
            <template #icon>
              <icon-star />
            </template>
            Collected
          </a-button>
        </template>
      </a-tabs>
      <a-spin :loading="Home.loading" tip="Loading..." class="w-full">
        <ul class="flex flex-wrap mt-7 min-h-[400px]">
          <li class="home__bottom__card" v-for="item in Home.list" :key="item.id">
            <ShowCard :data="item" @click="Home.handleToDetail(item.id)" />
          </li>
        </ul>
      </a-spin>
      <div class="text-center mt-8">
        <a-button-group>
          <a-button :disabled="!Home.skip" type="primary" @click="Home.handlePrev">
            <icon-left />
            Prev
          </a-button>
          <a-button :disabled="Home.list.length < pageSize" type="primary" @click="Home.handleNext">
            Next
            <icon-right />
          </a-button>
        </a-button-group>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home {
  &__top {
    min-height: 500px;
    height: calc(100vh - 154px);
    @apply pt-48 text-center;
  }

  &__bottom {
    :deep(.arco-tabs-nav::before) {
      background-color: transparent
    }

    :deep(.arco-tabs-nav-type-line .arco-tabs-tab:hover .arco-tabs-tab-title::before) {
      background-color: transparent;
    }

    :deep(.arco-tabs-tab-active),
    :deep(.arco-tabs-tab-active:hover) {
      color: #fff
    }

    :deep(.arco-tabs-nav-ink) {
      height: 4px;
      background-color: #fff
    }

    :deep(.arco-tabs-nav-size-large.arco-tabs-nav-type-line .arco-tabs-tab) {
      @apply w-24 text-2xl font-bold text-center;
    }

    :deep(.arco-tabs-nav-type-line .arco-tabs-tab-title) {
      @apply mx-auto;
    }

    &__card {
      width: calc((100% - 80px) / 5);
      @apply mr-5 mb-11;

      &:nth-of-type(5n) {
        margin-right: 0;
      }
    }

    .btn-tab-selected {
      border-color: #fff;
    }
  }
}
</style>