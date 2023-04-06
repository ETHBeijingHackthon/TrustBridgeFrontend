<script setup>
import { reactive } from 'vue'
import { Category, Upload, CommentCard } from '@/components'
import { getAvatar } from '@/utils/common'

const Detail = reactive({
  imgUrl: 'https://img1.baidu.com/it/u=3166229769,3131490154&fm=253&fmt=auto&app=120&f=JPEG?w=700&h=1000',
  category: 2,
  title: 'titletitletitletitletitletitletitletitletitletitletitletitle',
  postBy: '0x333....423d',
  point: 3,
  collect: 2,
  rates: ['a', 'b'],
  description: `Top Gun is a science fiction adventure film directed by Steven Spielberg, written by Zach Payne and Ernst Cline, and starring Tere Sheridan, Olivia Cooke, Simon Pegg, Ben Mendelsohn, Mark Rylance and T.J. Miller, released in China on March 30, 2018. Based on Ernst Cline's novel of the same name, the film tells the story of an older boy who has nothing to hold on to in real life and is addicted to games.With an in-depth analysis of the virtual game designer, he goes through trials and tribulations to find the three keys hidden in the levels, `,
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
  ]
})
</script>

<template>
  <div class="detail flex justify-center pt-16">
    <div class="detail__left w-[380px] mr-20 text-center">
      <div class="detail__left__image mb-7 rounded">
        <img :src="Detail.imgUrl" style="width: 368px; height: 368px"
          class="rounded overflow-hidden object-cover object-center" alt="item cover">
      </div>
      <Category :category="Detail.category" class="justify-center mb-2" :showLable="true" />
      <div class="mb-4 text-4xl break-words">{{ Detail.title }}</div>
      <div class="mb-6 text-[#B9B9B9]">Posted by {{ Detail.postBy }}</div>
      <div class="mb-2 text-3xl">{{ Detail.point.toFixed(1) }}</div>
      <a-rate :model-value="Detail.point" disabled />
      <div class="mt-4 mb-6 text-[#B9B9B9]">
        <a-avatar-group :size="24" :max-count="3">
          <a-avatar v-for="(item, index) in Detail.rates" :key="index">
            <img :src="getAvatar(item)" />
          </a-avatar>
        </a-avatar-group>
        <span>12+</span>
      </div>
      <a-button class="ml-auto mr-4" size="large">
        <template #icon>
          <icon-star :size="20" />
        </template>
        Collect ({{ Detail.collect }})
      </a-button>
    </div>
    <div class="detail__right w-[600px]">
      <div class="detail__right__title">Description</div>
      <div class="detail__right__wrap mb-10">{{ Detail.description }}</div>
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