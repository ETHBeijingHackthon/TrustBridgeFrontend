<script setup>
import { reactive, onMounted, onBeforeUnmount } from 'vue'
import { useAccount } from 'vagmi'
import { useRouter } from 'vue-router'
import Category from '@/contants/category'
import { ShowCard, Post } from '@/components'
import { getNftcreatedEntities, getNftcollectedEntities, queryTrustBridge } from '@/apis'
import { isMobile } from '@/utils/common'

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
      case 'posted':
        query = `where: {fid: 0, owner: "${address.value}", sort_in: [${Category.map(cate => '"' + cate.key + '"')}]}, first: ${pageSize}, skip: ${Home.skip}`
        break

      default:
        query = `where: {fid: 0${Home.category == '1' ? `, sort_in: [${Category.map(cate => '"' + cate.key + '"')}]` : `, sort: "${Home.category}"`}}, first: ${pageSize}, skip: ${Home.skip}`
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
    getNftcollectedEntities(`first: ${pageSize}, skip: ${Home.skip}, where: {collector: "${address.value}"}`)
      .then(res => {
        const ids = res.nftcollectedEntities.map(item => item.nftId)
        queryTrustBridge(`{ nftcreatedEntities(where: { nftId_in: [${ids}], sort_in: [${Category.map(cate => '"' + cate.key + '"')}], fid: 0 }, first: ${pageSize}) { id, nftId, owner, sort, coverUri, mediaType, multimedia, title, description, score, collectCount,reviewCount, fid } }`)
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
  getCollectedData() {
    Home.category = 'collected'
    Home.skip = 0
    Home.loading = true
    Home.list = []
    Home.getCollected()
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

let si;

onMounted(() => {
  Home.loading = true
  Home.getData()
  si = setInterval(() => {
    Home.getData()
  }, import.meta.env.VITE_REFRESH_DURATION * 1000)
})

onBeforeUnmount(() => {
  if (si) clearInterval(si)
})
</script>

<template>
  <div class="home">
    <div class="home__top pt-16 xl:pt-36 2xl:pt-44">
      <h1 class="text-[28px] lg:text-[48px] font-bold mb-4 lg:mb-0">Transparent, Trustworthy, Decentralized</h1>
      <h2 class="text-[20px] lg:text-[36px] font-bold mb-20"> For anyone to share and discover high-quality content</h2>
      <Post>
        <div class="home__post text-base lg:text-xl" data-title="Post New Item"></div>
      </Post>
    </div>
    <div class="home__bottom">
      <a-tabs :active-key="Home.category" :size="isMobile() ? 'small' : 'large'" @change="Home.handleTabChange">
        <a-tab-pane v-for="item in Category" :key="item.key" :title="item.label">
        </a-tab-pane>
        <template #extra>
          <div class="w-full mt-6 lg:mt-0 flex justify-center">
            <a-button v-if="isConnected" :disabled="!isConnected" class="ml-0 lg:ml-auto mr-4"
              :class="{ 'btn-tab-selected': Home.category === 'posted' }" :size="isMobile() ? 'medium' : 'large'"
              @click="Home.getPosted">
              <template #icon>
                <icon-send :size="20" />
              </template>
              Posted
            </a-button>
            <a-button v-if="isConnected" :class="{ 'btn-tab-selected': Home.category === 'collected' }"
              :disabled="!isConnected" :size="isMobile() ? 'medium' : 'large'" @click="Home.getCollectedData">
              <template #icon>
                <icon-star />
              </template>
              Collected
            </a-button>
          </div>
        </template>
      </a-tabs>
      <a-spin :loading="Home.loading" tip="Loading..." class="w-full">
        <ul v-if="Home.list.length" class="home__bottom__list mt-2 lg:mt-7 min-h-[200px]">
          <li class="home__bottom__card" v-for="item in Home.list" :key="item.id">
            <ShowCard :data="item" @click="Home.handleToDetail(item.id)" />
          </li>
        </ul>
        <div class="flex items-center justify-center mt-7 min-h-[200px]" v-else>
          <a-empty />
        </div>
      </a-spin>
      <div v-if="Home.list.length" class="text-center mt-2 lg:mt-8">
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
    @apply text-center pb-16;
  }

  &__post {
    position: relative;
    display: inline-block;
    padding: .8em 2em;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    user-select: none;
    color: white;
    font-weight: bold;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: linear-gradient(135deg, #6e8efb, #a777e3);
      border-radius: 4px;
      transition: box-shadow .25s, transform .2s ease;
      will-change: transform;
    }

    &:hover::before {
      box-shadow: 0 0px 12px rgba(167, 119, 227, .5);
    }

    &::after {
      position: relative;
      display: inline-block;
      content: attr(data-title);
      transition: transform .2s ease;
      font-weight: bold;
      letter-spacing: .01em;
      will-change: transform;
      transform:
        translateY(var(--ty, 0)) rotateX(var(--rx, 0)) rotateY(var(--ry, 0));
    }
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
      @apply mx-6 text-2xl font-bold text-center;
    }

    :deep(.arco-tabs-nav-type-line .arco-tabs-tab-title) {
      @apply mx-auto;
    }

    :deep(.arco-tabs-nav) {
      @apply flex-wrap;
    }

    :deep(.arco-tabs-nav-extra) {
      @apply w-full;
    }

    &__list {
      @apply flex flex-wrap;
    }

    &__card {
      width: 100%;
      @apply mr-0 mb-4;
    }

    .btn-tab-selected {
      border-color: #fff;
    }
  }
}

@media screen and (min-width: 640px) {
  .home {
    &__bottom {
      :deep(.arco-tabs-nav-extra) {
        @apply w-auto;
      }

      &__card {
        width: calc((100% - 40px) / 3);
        @apply mr-5 mb-5;

        &:nth-of-type(3n) {
          margin-right: 0;
        }
      }
    }
  }
}

@media screen and (min-width: 1200px) {
  .home {
    &__top {
      height: calc(100vh - 154px);
    }

    &__bottom {

      :deep(.arco-tabs-nav-extra) {
        @apply w-auto;
      }

      &__card {
        width: calc((100% - 80px) / 5);
        @apply mr-5 mb-11;

        &:nth-of-type(3n) {
          @apply mr-5;
        }

        &:nth-of-type(5n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>