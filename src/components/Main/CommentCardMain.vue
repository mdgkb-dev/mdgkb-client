<template>
  <el-card>
    <template #header>
      <div class="comment-header">
        <div class="left">
          <span class="commentTo">{{ comment.commentTo }}</span>
          <span class="title">{{ comment.title }}</span>
        </div>
        <div class="right">
          <span class="name">{{ comment.user.email }}</span>
          <span class="time">{{ $dateTimeFormatter.format(comment.publishedOn, { month: 'long' }) }}</span>
        </div>
      </div>
    </template>
    <div>{{ comment.text }}</div>
  </el-card>
</template>

<script lang="ts" setup>
import Comment from '@/classes/Comment';

defineProps({
  comment: {
    required: true,
    type: Object as PropType<Comment>,
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.comment-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-style: italic;
  .title {
    font-style: normal;
    font-weight: bold;
  }
  .left {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .right {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}
.comment-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-card {
  height: 100%;
  padding: 20px;
}
:deep(.el-card__header) {
  padding: 10px;
}
:deep(.el-card__body) {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
