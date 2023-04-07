<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Category from '@/contants/category'
import { ShowCard, Post } from '@/components'
import { getNftcreatedEntities } from '@/apis'

const USE_ROUTER = useRouter()
const Home = reactive({
  loading: false,
  list: [],
  getCreatedNft(query) {
    Home.list = []
    Home.loading = true
    getNftcreatedEntities(query)
      .then(res => {
        Home.list = res.nftcreatedEntities
      })
      .finally(() => {
        Home.loading = false
      })
  },
  handleTabChange(key) {
    Home.getCreatedNft(`where: {fid: 0${key == '1' ? '' : `, sort: "${key}"`}}, first: 10`)
  },
  handleToDetail(id) {
    USE_ROUTER.push({
      path: '/detail',
      query: { id }
    })
  }
})

onMounted(() => {
  Home.getCreatedNft(`where: {fid: 0}, first: 10`)
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
      <a-tabs default-active-key="1" size="large" @change="Home.handleTabChange">
        <a-tab-pane v-for="item in Category" :key="item.key" :title="item.label">
        </a-tab-pane>
        <template #extra>
          <a-button class="ml-auto mr-4" size="large" @click="onSend">
            <template #icon>
              <icon-send :size="20" />
            </template>
            Posted
          </a-button>
          <a-button size="large" @click="onCollected">
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
      <a-button-group>
        <a-button type="primary">
          <icon-left />
          Prev
        </a-button>
        <a-button type="primary">
          Next
          <icon-right />
        </a-button>
      </a-button-group>
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
  }
}
</style>