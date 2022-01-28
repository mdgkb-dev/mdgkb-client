<template>
  <div
    class="big-news-card card-hover"
    :style="{ 'background-image': 'url(' + news.getImageUrl() + ')' }"
    @click="$router.push(`/news/${news.slug}`)"
  >
    <div class="big-news-card-container">
      <div class="big-news-card-tags">
        <el-tag
          v-for="newsToTag in news.newsToTags.slice(0, 3)"
          :key="newsToTag.id"
          effect="plain"
          class="news-tag-link"
          size="small"
          @click.stop="filterNews(newsToTag.tag)"
        >
          <span>{{ newsToTag.tag.label }}</span>
        </el-tag>
      </div>
      <div class="big-news-card-title">{{ news.title }}</div>
      <div class="big-news-card-meta">
        <NewsMeta :news="news" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import NewsMeta from '@/components/News/NewsMeta.vue';
import INews from '@/interfaces/news/INews';

export default defineComponent({
  name: 'MainBigNewsCard',
  components: { NewsMeta },
  props: {
    news: {
      type: Object as PropType<INews>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.big-news-card {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 570px;
  border-radius: 5px;
  color: white;
  display: flex;
  align-items: flex-end;
  &-container {
    display: flex;
    flex-direction: column;
    margin: 25px;
  }
  &-tags {
    margin-bottom: 10px;
    .news-tag-link {
      font-size: 12px;
    }
  }
  &-title {
    font-weight: bold;
    font-size: 28px;
    letter-spacing: 1px;
    margin-bottom: 10px;
  }
  .card-meta {
    color: white;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 1px;
    :deep(.anticon) {
      font-size: 20px;
      height: 20px;
    }
  }
}
</style>