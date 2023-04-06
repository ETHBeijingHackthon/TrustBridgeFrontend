<script setup>
import { reactive, toRaw, watch } from 'vue'
import { useSigner, useAccount } from 'vagmi'
import Category from '@/contants/category'
import { ShowCard, Post } from '@/components'
import { geneTrustBridgeContract } from '@/contracts'

const { data } = useSigner()
const { isConnected } = useAccount()

const Home = reactive({
  list: [
    {
      imgUrl: 'https://img1.baidu.com/it/u=3166229769,3131490154&fm=253&fmt=auto&app=120&f=JPEG?w=700&h=1000',
      category: 2,
      title: 'title',
      rates: ['a', 'b'],
      point: 3
    },
    {
      imgUrl: 'https://img1.baidu.com/it/u=3166229769,3131490154&fm=253&fmt=auto&app=120&f=JPEG?w=700&h=1000',
      category: 2,
      title: 'title',
      rates: ['a', 'b'],
      point: 3
    },
    {
      imgUrl: 'https://img1.baidu.com/it/u=3166229769,3131490154&fm=253&fmt=auto&app=120&f=JPEG?w=700&h=1000',
      category: 2,
      title: 'title',
      rates: ['a', 'b'],
      point: 3
    },
    {
      imgUrl: 'https://img1.baidu.com/it/u=3166229769,3131490154&fm=253&fmt=auto&app=120&f=JPEG?w=700&h=1000',
      category: 2,
      title: 'title',
      rates: ['a', 'b'],
      point: 3
    },
    {
      imgUrl: 'https://img1.baidu.com/it/u=3166229769,3131490154&fm=253&fmt=auto&app=120&f=JPEG?w=700&h=1000',
      category: 2,
      title: 'title',
      rates: ['a', 'b'],
      point: 3
    },
    {
      imgUrl: 'https://img1.baidu.com/it/u=3166229769,3131490154&fm=253&fmt=auto&app=120&f=JPEG?w=700&h=1000',
      category: 2,
      title: 'title',
      rates: ['a', 'b'],
      point: 3
    },
    {
      imgUrl: 'https://img1.baidu.com/it/u=3166229769,3131490154&fm=253&fmt=auto&app=120&f=JPEG?w=700&h=1000',
      category: 2,
      title: 'title',
      rates: ['a', 'b'],
      point: 3
    },
    {
      imgUrl: 'https://img1.baidu.com/it/u=3166229769,3131490154&fm=253&fmt=auto&app=120&f=JPEG?w=700&h=1000',
      category: 2,
      title: 'title',
      rates: ['a', 'b'],
      point: 3
    },
  ]
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
      <a-tabs default-active-key="1" size="large">
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
      <ul class="flex flex-wrap mt-7">
        <li class="home__bottom__card" v-for="(item, index) in Home.list" :key="index">
          <ShowCard :data="item" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home {
  &__top {
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